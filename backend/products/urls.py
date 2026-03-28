from django.urls import path
from .views import register, get_products, get_recommendations, place_order, product_detail, get_orders, add_product
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', register),
    path('login/', TokenObtainPairView.as_view()),
    path('', get_products),
    path('recommend/<int:product_id>/', get_recommendations),
    path('order/', place_order),
    path('<int:id>/', product_detail),
    path('orders/', get_orders),
    path("add/", add_product),
]