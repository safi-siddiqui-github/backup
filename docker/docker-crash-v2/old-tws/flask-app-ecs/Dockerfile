FROM python:3.9

WORKDIR /app

COPY app.py app.py
COPY run.py run.py

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

EXPOSE 80

CMD ["python","run.py"]
