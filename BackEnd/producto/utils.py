from .views import ProductosEnVenta


def ruta_imagen_producto(instance, filename):
    vendedor_id = ProductosEnVenta.idGet()
    return f'vendedores/{vendedor_id}/{filename}'