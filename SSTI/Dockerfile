FROM python:alpine

WORKDIR /app

COPY ./app /app
COPY ./flag.txt /flag.txt

RUN pip install Flask

CMD ["python", "index.py"]
