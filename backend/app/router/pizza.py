from fastapi import APIRouter

from app.model.pizza import Pizza, Extra

router = APIRouter()

pizzas = [
    Pizza(id=1, name='Cheese & Tomato', price=11.90, ingredients=['tomato', 'cheese'], img='cheesetomato.png'),
    Pizza(id=2, name='Mighty Meaty', price=16.90, ingredients=['tomato', 'pepperoni', 'ham', 'onion', 'mushrooms', 'sausage'],  img='cheesetomato.png'),
    Pizza(id=3, name='Pepperoni Passion', price=16.90, ingredients=['tomato', 'pepperoni', 'cheese'],  img='cheesetomato.png'),
    Pizza(id=4, name='Texas BBQ', price=16.90, ingredients=['bbq sauce', 'bacon', 'onion', 'roast chicken', 'green peppers'], img='cheesetomato.png'),
    Pizza(id=5, name='Vegi Supreme', price=16.90, ingredients=['tomato', 'onion', 'green peppers', 'mushrooms'],  img='cheesetomato.png'),
    Pizza(id=6, name='American Hot', price=15.90, ingredients=['tomato', 'onion', 'pepperoni', 'jalapeno'],  img='cheesetomato.png'),
    Pizza(id=7, name='Chicken and Rasher Bacon', price=16.90, ingredients=['tomato', 'chicken breast', 'bacon', 'onion'],  img='cheesetomato.png'),
    Pizza(id=8, name='Chicken Feast', price=15.90, ingredients=['tomato', 'chicken', 'mushrooms'],  img='cheesetomato.png'),
    Pizza(id=9, name='Four Vegi', price=15.90, ingredients=['tomato', 'spinach', 'onion', 'mushrooms'],  img='cheesetomato.png'),
    Pizza(id=10, name='Hot & Spicy', price=15.90, ingredients=['tomato', 'onion', 'beef', 'green peppers', 'jalapeno'],  img='cheesetomato.png'),
    Pizza(id=11, name='Meateor', price=16.90, ingredients=['bbq sauce', 'cheese', 'pork meatballs', 'sausage', 'pepperoni', 'bacon'],  img='cheesetomato.png'),
    Pizza(id=12, name='New Yorker', price=16.90, ingredients=['tomato', 'pepperoni', 'bacon', 'mushrooms'],  img='cheesetomato.png'),
    Pizza(id=13, name='Tandoori Hot', price=16.90, ingredients=['tomato', 'chicken', 'onion', 'green peppers', 'jalapeno'],  img='cheesetomato.png'),
    Pizza(id=14, name='The Sizzler', price=16.90, ingredients=['tomato', 'garlic sauce', 'onion', 'pepperoni', 'jalapeno', 'green peppers'],  img='cheesetomato.png'),
]

extras = [
    Extra(name='ham', price=2),
    Extra(name='onion', price=1),
    Extra(name='bacon', price=2),
    Extra(name='cheese', price=1.4),
    Extra(name='green peppers', price=1.2),
    Extra(name='mushrooms', price=1.2),
]

@router.get("/pizza/all", response_model=list[Pizza])
def get_pizzas():
    return pizzas

@router.get("/extra/all", response_model=list[Extra])
def get_extras():
    return extras
