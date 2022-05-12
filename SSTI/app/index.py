from flask import Flask, request, render_template, render_template_string

app = Flask(__name__)

HOSTNAME = "0.0.0.0"
PORT = 5000


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template('index.html')
    else:
        name = request.form.get('username')
        num = int(request.form.get('number'))
        if num < 0 or num > 4:
            return "Invalid number!(0~4)"
        fruits = ['🍎', '🍓', '🍌', '🍈', '🍋']
        fruit = fruits[num]
        template = '''
            <p>Your number: {}</p>
            <h1>Today's your lucky fruit is: {}</h1>
            
            <b>Have a nice day, {}!</b>
        
        '''.format(num, fruit, name)
        return render_template_string(template)


if __name__ == "__main__":
    app.run(host=HOSTNAME, port=PORT)
