from .serializers import CustomerSerializer


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': CustomerSerializer(user, context={'request': request}).data
    }