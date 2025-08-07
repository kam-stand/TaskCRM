from django.shortcuts import render

# Create your views here.

# authapp/views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer

@csrf_exempt
def create_customer(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)
    try:
        data = json.loads(request.body)
        name = data.get('name')
        company = data.get('company')
        phone_number = data.get('phone_number')
        email = data.get('email')
        if not all([name, company, phone_number, email]):
            return JsonResponse({'error': 'All fields required'}, status=400)

        if Customer.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        customer = Customer.objects.create(
            name=name, company=company, phone_number=phone_number, email=email
        )
        return JsonResponse({'message': 'Customer created', 'customer_id': customer.id}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)



def get_customer(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'GET method required'}, status=405)

    customer_id = request.GET.get('id')
    if customer_id:
        try:
            customer = Customer.objects.get(id=customer_id)
            data = {
                'id': customer.id,
                'name': customer.name,
                'company': customer.company,
                'phone_number': customer.phone_number,
                'email': customer.email,
                'created_at': customer.created_at.isoformat(),
                'updated_at': customer.updated_at.isoformat(),
            }
            return JsonResponse(data)
        except Customer.DoesNotExist:
            return JsonResponse({'error': 'Customer not found'}, status=404)
    else:
        customers = Customer.objects.all()
        data = []
        for c in customers:
            data.append({
                'id': c.id,
                'name': c.name,
                'company': c.company,
                'phone_number': c.phone_number,
                'email': c.email,
                'created_at': c.created_at.isoformat(),
                'updated_at': c.updated_at.isoformat(),
            })
        return JsonResponse({'customers': data})


@csrf_exempt
def update_customer(request):
    if request.method != 'PUT':
        return JsonResponse({'error': 'PUT method required'}, status=405)
    try:
        data = json.loads(request.body)
        customer_id = data.get('id')
        if not customer_id:
            return JsonResponse({'error': 'Customer id required'}, status=400)

        customer = Customer.objects.get(id=customer_id)

        # Update fields if provided
        for field in ['name', 'company', 'phone_number', 'email']:
            if field in data:
                setattr(customer, field, data[field])
        customer.save()

        return JsonResponse({'message': 'Customer updated'})
    except Customer.DoesNotExist:
        return JsonResponse({'error': 'Customer not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)



@csrf_exempt
def delete_customer(request):
    if request.method != 'DELETE':
        return JsonResponse({'error': 'DELETE method required'}, status=405)
    try:
        data = json.loads(request.body)
        customer_id = data.get('id')
        if not customer_id:
            return JsonResponse({'error': 'Customer id required'}, status=400)

        customer = Customer.objects.get(id=customer_id)
        customer.delete()
        return JsonResponse({'message': 'Customer deleted'})
    except Customer.DoesNotExist:
        return JsonResponse({'error': 'Customer not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
