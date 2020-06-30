import requests
from flask import Flask, render_template, request, redirect, url_for, flash, session
from api.requests_api import RequestsApi
from models.Propierty import Propierty
import random

# Declarando variable Flask
app = Flask(__name__)
# Llave secreta
app.secret_key = "qwertyuiop"


def session_validate():
    if 'login' in session:
        return True
    else:
        return False


# Ruta root
@app.route('/')
def index():
    res = RequestsApi.get_all_api()
    print(res)
    # Enviamos una variable propierties , lo que tenemos en res.
    return render_template('index.html', propierties=res)


@app.route('/new')
def new():
    if session_validate() == False:
        return redirect(url_for('login'))
    return render_template('create.html')


@app.route('/save', methods=['POST'])
def save():
    if session_validate() == False:
        return redirect(url_for('login'))
    if request.method == 'POST':
        try:
            imglist = ['https://res.cloudinary.com/dta3svuvn/image/upload/v1593216688/cegcpmalngmemqt25sby.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593291537/photo-1471623600634-4d04cfc56a27_wt7kjk.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593291536/photo-1523217582562-09d0def993a6_boe3nh.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593291536/photo-1517541866997-ea18e32ea9e9_wk02og.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593291535/photo-1521783593447-5702b9bfd267_izgbpo.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593291537/photo-1433961395396-def499303f0e_jpbawv.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593216738/agzuueg36frzvoixsp1m.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593122049/fdajojm463cm5u7ogk2c.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593046564/qdjlbt7vo4x7m1vwubls.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290025/395_Detroit_St.25_forprintuse.0_uwdgng.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290025/large_gwnob5.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290024/5_brown_hiuse_o5yssv.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290023/entrance_x0rh1c.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290021/217300328_jcb2wk.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290019/960x0_hd384b.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290019/960x0_hd384b.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290017/180464031_y4vcot.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290017/habitacion-2-compartida_yvqvtn.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290017/14101752736419_ev4lcs.jpg',
                       'https://res.cloudinary.com/dta3svuvn/image/upload/v1593290016/c038d04e3cd4a63d2fa054be9e64518e_utfchs.jpg']
            #imglist = ['2k0', '8st', 'aaf', '306', 'abv', 'a3s']
            img = random.choice(imglist)
            title_input = request.form['title_input']
            type_input = request.form['type_input']
            address_input = request.form['address_input']
            rooms_input = request.form['rooms_input']
            price_input = request.form['price_input']
            area_input = request.form['area_input']
            #picture_input = request.form['picture_input']
            propierty = Propierty(title=(title_input), type_=(type_input), address=(address_input),
                                  rooms=int(rooms_input), price=int(price_input), area=int(area_input), picture=img)
            res = RequestsApi.save_api(propierty)
            flash('Propierty saved')
            print(res)
            return redirect(url_for('index'))
        except:
            flash('Not saved')


@app.route('/view/<id>')
def view(id):
    res = RequestsApi.get_one_api(id)
    print(res)
    return render_template('view.html', propierty=res)


@app.route('/delete/<id>')
def delete(id):
    if session_validate() == False:
        flash('You must log in')
        return redirect(url_for('login'))
    res = RequestsApi.delete_one_api(id)
    print(res)
    flash('Deleted')
    return redirect(url_for('index'))


@app.route('/login', methods=['POST', 'GET'])
def login():
    if session_validate() == True:
        return redirect(url_for('index'))
    if request.method == 'POST':
        try:
            email = request.form['email']
            password = request.form['password']

            if(email == 'cesdefinal@cesde.com' and password == '123456'):
                session['login'] = True
                session['email'] = email
                return redirect(url_for('index'))
            else:
                flash('Email not found')
                flash('Password not found')
        except:
            flash('Connection Error')
    return render_template('login.html')


@app.route('/logout')
def logout():
    if session_validate() == False:
        return redirect(url_for('login'))
    session.pop('login', None)
    session.pop('email', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(port=8081, debug=True)
