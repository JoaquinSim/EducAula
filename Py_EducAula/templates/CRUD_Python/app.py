from flask import Flask
from flask import render_template,request,redirect,url_for #render_template: muestra vista #request #redirect
from flaskext.mysql import MySQL
from flask import send_from_directory
from datetime import datetime
import os #importar modulo sistema operativo



app=Flask(__name__)

mysql = MySQL()
app.config['MYSQL_DATABASE_HOST']='localhost'
app.config['MYSQL_DATABASE_USER']='root'
app.config['MYSQL_DATABASE_PASSWORD']=''
app.config['MYSQL_DATABASE_DB']='sistema'
mysql.init_app(app)

CARPETA = os.path.join('uploads')
app.config ['CARPETA']=CARPETA

@app.route('/uploads/<nombreFoto>')
def uploads(nombreFoto):
   return send_from_directory(app.config ['CARPETA'],nombreFoto)

@app.route('/')
def index():
    
    sql= "SELECT * FROM `alumnos`;"
    conn = mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql)

    alumnos=cursor.fetchall()
    print(alumnos)

    conn.commit()

    return render_template('alumnos/crud.html',alumnos=alumnos)

@app.route('/destroy/<int:id>')
def destroy(id):
    conn = mysql.connect()
    cursor=conn.cursor()

    cursor.execute("SELECT Foto FROM alumnos WHERE id=%s",id)
    fila=cursor.fetchall()
    os.remove(os.path.join(app.config['CARPETA'],fila[0][0]))

    cursor.execute("DELETE FROM alumnos WHERE id=%s",(id))
    conn.commit()
    return redirect('/')

@app.route('/edit/<int:id>')
def edit(id):

    conn = mysql.connect()
    cursor=conn.cursor()
    cursor.execute("SELECT * FROM alumnos WHERE id=%s",(id))
    alumnos=cursor.fetchall()
    conn.commit()
    return render_template('alumnos/edit.html', alumnos=alumnos)

@app.route('/update', methods=['POST'])
def update():

    _nombre=request.form['txtNombre']
    _apellido=request.form['txtApellido']
    _correo=request.form['txtCorreo']
    _foto=request.files['txtFoto']
    id=request.form['txtID']

    sql= "UPDATE alumnos SET Nombre=%s,Apellido=%s,Correo=%s WHERE id=%s ;"

    datos=(_nombre,_apellido,_correo,id)

    conn = mysql.connect()
    cursor=conn.cursor()

    now=datetime.now()
    tiempo=now.strftime("%Y%H%M%S")

    if _foto.filename!='':
    
        nuevoNombreFoto=tiempo+_foto.filename
        _foto.save("uploads/"+nuevoNombreFoto)
        
        cursor.execute("SELECT Foto FROM alumnos WHERE id=%s",id)
        fila=cursor.fetchall()

        os.remove(os.path.join(app.config ['CARPETA'],fila[0][0]))
        cursor.execute("UPDATE alumnos SET foto=%s WHERE id=%s",(nuevoNombreFoto,id))
        conn.commit()

    cursor.execute(sql,datos)
    conn.commit()
    
    return redirect('/')

@app.route('/create')
def create():
    return render_template('alumnos/create.html')


@app.route('/store', methods=['POST'])
def storage():

    _nombre=request.form['txtNombre']
    _apellido=request.form['txtApellido']
    _correo=request.form['txtCorreo']
    _foto=request.files['txtFoto']

    now=datetime.now()
    tiempo=now.strftime("%Y%H%M%S")

    if _foto.filename!='':
        nuevoNombreFoto=tiempo+_foto.filename
        _foto.save("uploads/"+nuevoNombreFoto)


    sql= "INSERT INTO `alumnos` (`Id`, `Nombre`, `Apellido`, `Correo`, `Foto`) VALUES (NULL,%s,%s,%s,%s);"

    datos=(_nombre,_apellido,_correo,nuevoNombreFoto)

    conn = mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql,datos)
    conn.commit()

    return redirect('/')
    


if __name__ =='__main__':
    app.run(debug=True)