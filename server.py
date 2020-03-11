from flask import Flask, render_template, request, redirect

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def game():
    player_name = request.args.get('player')
    return render_template('game.html',
                           player_name=player_name)


if __name__ == '__main__':
    app.run(debug=True,
            port=5000)
