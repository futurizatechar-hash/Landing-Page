-- ==============================================================================
-- ESQUEMA DE BASE DE DATOS POSTGRESQL — SUPABASE
-- PROYECTO: Sistema de Fidelización & Club de Puntos "Tu Tablita" (M-13)
-- CLIENTE: Tu Tablita Autoservicio (Luciano Sosa) · Gral. Bustos 699, Córdoba, AR
-- PARIDAD: Opción A (1 Punto = $1 ARS de mercadería en catálogo) · 5% Cashback
-- ==============================================================================

-- 0. USUARIOS DEL SISTEMA Y OPERADORES DE CAJA
CREATE TABLE IF NOT EXISTS public.usuarios_sistema (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dni VARCHAR(20) NOT NULL UNIQUE,
    nombre_completo VARCHAR(150) NOT NULL,
    rol VARCHAR(30) NOT NULL DEFAULT 'cajero' CHECK (rol IN ('super-admin', 'cajero')),
    password_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_usuarios_dni ON public.usuarios_sistema(dni);

CREATE TABLE IF NOT EXISTS public.configuracion_negocio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_comercio VARCHAR(100) NOT NULL DEFAULT 'Tu Tablita Autoservicio',
    direccion VARCHAR(150) DEFAULT 'Gral. Bustos 699, Córdoba, Argentina',
    porcentaje_cashback NUMERIC(5, 2) NOT NULL DEFAULT 5.00,
    valor_punto_ars NUMERIC(10, 2) NOT NULL DEFAULT 1.00,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dni VARCHAR(20) NOT NULL UNIQUE,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono VARCHAR(30),
    puntos_actuales INTEGER NOT NULL DEFAULT 0 CHECK (puntos_actuales >= 0),
    total_historico_comprado NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_compras_realizadas INTEGER NOT NULL DEFAULT 0,
    total_canjes_realizados INTEGER NOT NULL DEFAULT 0,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_clientes_dni ON public.clientes(dni);
CREATE INDEX IF NOT EXISTS idx_clientes_nombre ON public.clientes(nombre_completo);

CREATE TABLE IF NOT EXISTS public.catalogo_premios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_producto VARCHAR(150) NOT NULL,
    categoria VARCHAR(60) NOT NULL DEFAULT 'Fiambres y Quesos',
    descripcion TEXT,
    icono_emoji VARCHAR(10) DEFAULT '🧀',
    puntos_requeridos INTEGER NOT NULL CHECK (puntos_requeridos > 0),
    valor_referencia_ars NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    stock_disponible BOOLEAN NOT NULL DEFAULT TRUE,
    orden INTEGER NOT NULL DEFAULT 1,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_catalogo_categoria ON public.catalogo_premios(categoria);

CREATE TABLE IF NOT EXISTS public.movimientos_puntos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('COMPRA', 'CANJE', 'AJUSTE_MANUAL')),
    monto_compra_bruto NUMERIC(12, 2) DEFAULT 0.00,
    puntos_movimiento INTEGER NOT NULL,
    puntos_saldo_resultante INTEGER NOT NULL,
    premio_id UUID REFERENCES public.catalogo_premios(id) ON DELETE SET NULL,
    detalle TEXT,
    operador VARCHAR(100) DEFAULT 'Caja 1',
    operador_dni VARCHAR(20),
    operador_rol VARCHAR(30) DEFAULT 'cajero',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_movimientos_cliente ON public.movimientos_puntos(cliente_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_movimientos_operador ON public.movimientos_puntos(operador_dni, created_at DESC);

-- RPC: Registrar Compra
CREATE OR REPLACE FUNCTION public.registrar_compra(
    p_cliente_id UUID,
    p_monto_bruto NUMERIC,
    p_operador VARCHAR DEFAULT 'Caja 1',
    p_operador_dni VARCHAR DEFAULT NULL,
    p_operador_rol VARCHAR DEFAULT 'cajero'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_porcentaje NUMERIC;
    v_puntos_ganados INTEGER;
    v_saldo_actual INTEGER;
    v_saldo_nuevo INTEGER;
    v_movimiento_id UUID;
    v_cliente_nombre VARCHAR;
BEGIN
    IF p_monto_bruto <= 0 THEN
        RAISE EXCEPTION 'El monto bruto de compra debe ser mayor a 0.';
    END IF;

    SELECT COALESCE(porcentaje_cashback, 5.00) INTO v_porcentaje 
    FROM public.configuracion_negocio 
    WHERE activo = TRUE 
    LIMIT 1;

    v_puntos_ganados := FLOOR(p_monto_bruto * (COALESCE(v_porcentaje, 5.00) / 100.0));
    IF v_puntos_ganados < 1 THEN
        v_puntos_ganados := 1;
    END IF;

    SELECT puntos_actuales, nombre_completo INTO v_saldo_actual, v_cliente_nombre
    FROM public.clientes
    WHERE id = p_cliente_id AND activo = TRUE
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cliente no encontrado o inactivo.';
    END IF;

    v_saldo_nuevo := v_saldo_actual + v_puntos_ganados;

    UPDATE public.clientes
    SET 
        puntos_actuales = v_saldo_nuevo,
        total_historico_comprado = total_historico_comprado + p_monto_bruto,
        total_compras_realizadas = total_compras_realizadas + 1,
        updated_at = timezone('utc', now())
    WHERE id = p_cliente_id;

    INSERT INTO public.movimientos_puntos (
        cliente_id, tipo, monto_compra_bruto, puntos_movimiento,
        puntos_saldo_resultante, detalle, operador, operador_dni, operador_rol
    ) VALUES (
        p_cliente_id, 'COMPRA', p_monto_bruto, v_puntos_ganados,
        v_saldo_nuevo, 'Compra de $' || TO_CHAR(p_monto_bruto, 'FM999,999,999') || ' ARS (+' || v_puntos_ganados || ' pts)',
        p_operador, p_operador_dni, p_operador_rol
    )
    RETURNING id INTO v_movimiento_id;

    RETURN jsonb_build_object(
        'success', TRUE,
        'cliente_id', p_cliente_id,
        'cliente_nombre', v_cliente_nombre,
        'puntos_ganados', v_puntos_ganados,
        'saldo_nuevo', v_saldo_nuevo
    );
END;
$$;

-- RPC: Canjear Premio
CREATE OR REPLACE FUNCTION public.canjear_premio(
    p_cliente_id UUID,
    p_premio_id UUID,
    p_operador VARCHAR DEFAULT 'Caja 1',
    p_operador_dni VARCHAR DEFAULT NULL,
    p_operador_rol VARCHAR DEFAULT 'cajero'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_puntos_requeridos INTEGER;
    v_premio_nombre VARCHAR;
    v_saldo_actual INTEGER;
    v_saldo_nuevo INTEGER;
    v_movimiento_id UUID;
    v_cliente_nombre VARCHAR;
BEGIN
    SELECT puntos_requeridos, nombre_producto INTO v_puntos_requeridos, v_premio_nombre
    FROM public.catalogo_premios
    WHERE id = p_premio_id AND activo = TRUE AND stock_disponible = TRUE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Premio no disponible o sin stock.';
    END IF;

    SELECT puntos_actuales, nombre_completo INTO v_saldo_actual, v_cliente_nombre
    FROM public.clientes
    WHERE id = p_cliente_id AND activo = TRUE
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cliente no encontrado o inactivo.';
    END IF;

    IF v_saldo_actual < v_puntos_requeridos THEN
        RAISE EXCEPTION 'Puntos insuficientes.';
    END IF;

    v_saldo_nuevo := v_saldo_actual - v_puntos_requeridos;

    UPDATE public.clientes
    SET 
        puntos_actuales = v_saldo_nuevo,
        total_canjes_realizados = total_canjes_realizados + 1,
        updated_at = timezone('utc', now())
    WHERE id = p_cliente_id;

    INSERT INTO public.movimientos_puntos (
        cliente_id, tipo, puntos_movimiento, puntos_saldo_resultante,
        premio_id, detalle, operador, operador_dni, operador_rol
    ) VALUES (
        p_cliente_id, 'CANJE', -v_puntos_requeridos, v_saldo_nuevo,
        p_premio_id, 'Canje de premio: ' || v_premio_nombre,
        p_operador, p_operador_dni, p_operador_rol
    )
    RETURNING id INTO v_movimiento_id;

    RETURN jsonb_build_object(
        'success', TRUE,
        'cliente_id', p_cliente_id,
        'saldo_nuevo', v_saldo_nuevo
    );
END;
$$;

-- Semillas Iniciales
INSERT INTO public.configuracion_negocio (nombre_comercio, direccion, porcentaje_cashback, valor_punto_ars)
VALUES ('Tu Tablita Autoservicio', 'Gral. Bustos 699, Córdoba, Argentina', 5.00, 1.00)
ON CONFLICT DO NOTHING;

INSERT INTO public.usuarios_sistema (dni, nombre_completo, rol, password_hash, activo)
VALUES 
    ('35120450', 'Luciano Sosa', 'super-admin', 'admin123', TRUE),
    ('38901234', 'Romina Paz', 'cajero', 'caja123', TRUE)
ON CONFLICT (dni) DO NOTHING;
ON CONFLICT DO NOTHING;
