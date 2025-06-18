#!/usr/bin/env python
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'main_app.settings')
django.setup()

from producto.models import Usuario, Comprador, Pedido, Carrito, Producto, Vendedor

def debug_usuario_35():
    print("=== DEBUG USUARIO 35 ===")
    
    # Verificar si el usuario existe
    try:
        usuario = Usuario.objects.get(idusuario=35)
        print(f"Usuario encontrado: {usuario.nombre} {usuario.apellido}")
        print(f"Tipo de usuario: {usuario.tipousuario}")
    except Usuario.DoesNotExist:
        print("Usuario 35 no existe")
        return
    
    # Verificar si es comprador
    try:
        comprador = Comprador.objects.get(idusuario=usuario)
        print(f"Comprador encontrado: ID {comprador.idcomprador}")
    except Comprador.DoesNotExist:
        print("Usuario 35 no es comprador")
        return
    
    # Verificar pedidos
    pedidos = Pedido.objects.filter(idcomprador=comprador)
    print(f"Pedidos del comprador: {pedidos.count()}")
    
    for pedido in pedidos:
        print(f"  Pedido ID: {pedido.idpedido}")
        print(f"  Fecha: {pedido.fechapedido}")
        print(f"  Vendedor: {pedido.idvendedor.idusuario.nombre}")
        
        # Verificar carritos del pedido
        carritos = Carrito.objects.filter(idpedido=pedido)
        print(f"  Carritos en pedido: {carritos.count()}")
        
        for carrito in carritos:
            print(f"    Carrito ID: {carrito.idcarrito}")
            print(f"    Producto: {carrito.idproducto.nombre}")
            print(f"    Cantidad: {carrito.cantidadproductos}")
            print(f"    Precio total: {carrito.preciototal}")
    
    # Verificar todos los pedidos en la base de datos
    print("\n=== TODOS LOS PEDIDOS EN LA BD ===")
    todos_pedidos = Pedido.objects.all()
    print(f"Total de pedidos: {todos_pedidos.count()}")
    
    for pedido in todos_pedidos:
        print(f"Pedido {pedido.idpedido}: Comprador {pedido.idcomprador.idusuario.nombre} -> Vendedor {pedido.idvendedor.idusuario.nombre}")
    
    # Verificar todos los carritos
    print("\n=== TODOS LOS CARRITOS EN LA BD ===")
    todos_carritos = Carrito.objects.all()
    print(f"Total de carritos: {todos_carritos.count()}")
    
    for carrito in todos_carritos:
        print(f"Carrito {carrito.idcarrito}: Producto {carrito.idproducto.nombre}, Pedido {carrito.idpedido.idpedido}")

def debug_usuarios_con_carritos():
    print("\n=== USUARIOS CON CARRITOS ===")
    
    # Obtener todos los carritos con información del comprador
    carritos = Carrito.objects.select_related('idpedido__idcomprador__idusuario').all()
    
    # Agrupar por comprador
    compradores_con_carritos = {}
    for carrito in carritos:
        comprador = carrito.idpedido.idcomprador
        usuario = comprador.idusuario
        
        if usuario.idusuario not in compradores_con_carritos:
            compradores_con_carritos[usuario.idusuario] = {
                'usuario': usuario,
                'carritos': []
            }
        
        compradores_con_carritos[usuario.idusuario]['carritos'].append(carrito)
    
    # Mostrar información
    for user_id, data in compradores_con_carritos.items():
        usuario = data['usuario']
        carritos = data['carritos']
        
        print(f"\nUsuario {user_id}: {usuario.nombre} {usuario.apellido}")
        print(f"  Tipo: {usuario.tipousuario}")
        print(f"  Carritos: {len(carritos)}")
        
        for carrito in carritos:
            print(f"    - Carrito {carrito.idcarrito}: {carrito.idproducto.nombre} (Pedido {carrito.idpedido.idpedido})")

if __name__ == "__main__":
    debug_usuario_35()
    debug_usuarios_con_carritos() 