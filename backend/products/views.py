from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer


# ✅ REGISTER
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password)

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "User created successfully",
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })


# ✅ LOGIN
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })
    else:
        return Response({"error": "Invalid credentials"}, status=400)


# ✅ GET PRODUCTS
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# ✅ PRODUCT DETAILS
@api_view(['GET'])
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Not found"}, status=404)


# ✅ AI RECOMMENDATIONS
@api_view(['GET'])
def get_recommendations(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    recommendations = Product.objects.filter(
        category=product.category
    ).exclude(id=product_id)

    serializer = ProductSerializer(recommendations, many=True)
    return Response(serializer.data)


# ✅ PLACE ORDER 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    items = request.data.get('items', [])

    if not items:
        return Response({"error": "Cart is empty"}, status=400)

    order = Order.objects.create(user=user)

    for item in items:
        try:
            product = Product.objects.get(id=item['id'])

            quantity = item.get('quantity', 1)

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity   
            )

        except Product.DoesNotExist:
            continue

    return Response({"message": "Order placed successfully"})

# ✅ GET USER ORDERS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    try:
        user = request.user
        orders = Order.objects.filter(user=user).order_by('-id')

        data = []

        for order in orders:
            items = OrderItem.objects.filter(order=order)

            items_data = []

            for item in items:
                # ✅ SAFE ACCESS
                if item.product:
                    items_data.append({
                        "name": item.product.name,
                        "price": item.product.price,
                        "quantity": getattr(item, "quantity", 1),
                        "total": item.product.price * getattr(item, "quantity", 1)
                    })

            data.append({
                "id": order.id,
                "items": items_data
            })

        return Response(data)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product(request):
    name = request.data.get('name')
    price = request.data.get('price')
    category = request.data.get('category')
    description = request.data.get('description')
    image = request.data.get('image')

    product = Product.objects.create(
        name=name,
        price=price,
        category=category,
        description=description,
        image=image
    )

    return Response({"message": "Product added successfully"})