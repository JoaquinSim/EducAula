from flask import Flask
from flask import render_template, request, redirect
import pymysql
from flaskext.mysql import MySQL
from flask import send_from_directory
from datetime import datetime
import os

app=Flask(__name__)
mysql = MySQL()

#conectando a la base de datos local
app.config ['MYSQL_DATABASE_HOST']='localhost'
#conectando con el usuario
app.config ['MYSQL_DATABASE_USER']='root'
#conectando con contraseña
app.config ['MYSQL_DATABASE_PASSWORD']=''
#conectando a la base de datos
app.config ['MYSQL_DATABASE_DB']='sistema'
#inicializar la conexion entre la base de datos y la aplicacion
mysql.init_app(app)

sql= "SELECT * FROM `usuarios`;"

#Index

@app.route('/')
def index():
    return render_template('index.html')


#LOGIN
@app.route('/registro')
def registro():
    return render_template('registro.html')

@app.route('/login')
def login():
    return render_template('login.html')


#Materias
@app.route('/matematicas')
def matematicas():
    return render_template('matematicas.html')

@app.route('/sociales')
def sociales():
    return render_template('sociales.html')



@app.route('/ingles')
def ingles():
    return render_template('ingles.html')

@app.route('/lenguaje')
def lenguaje():
    return render_template('lenguaje.html')











# Registro

@app.route('/store', methods=['POST'])
def storage():
    _nombre = request.form['txtNombre']
    _apellido = request.form['txtApellido']
    _correo = request.form['txtCorreo']
    _clave = request.form['txtClave']

    sql = "INSERT INTO `usuarios` (`Id`, `Nombre`, `Apellido`, `Correo`, `Clave`) VALUES (NULL,%s,%s,%s,%s);"

    datos = (_nombre, _apellido, _correo, _clave)

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(sql, datos)
    conn.commit()

    return render_template('login.html')


###Consulta a la pagina

try:
    print("Resultado de PyMySQL usuarios:")
    usuarioRegistrado = mysql.connect()
    cursor = usuarioRegistrado.cursor()
    cursor.execute( "SELECT Correo, Clave FROM usuarios" )
    for Correo, Clave in cursor.fetchall() :
        print (Correo, Clave)
    usuarioRegistrado.close()
    print("")
    print("Resultado de PyMySQL alumnos:")
    usuarioRegistradoCrud = mysql.connect()
    cursor = usuarioRegistradoCrud.cursor()
    cursor.execute( "SELECT Correo, Nombre FROM alumnos" )
    for Correo, Clave in cursor.fetchall() :
        print (Correo, Clave)
    usuarioRegistradoCrud.close()
except (pymysql.err.OperationalError, pymysql.err.InternalError) as e:
	print("Ocurrió un error al conectar: ", e)







#CRUD
@app.route('/crud')
def crud():
    return render_template('CRUD_Python/crud.html')

CARPETA= os.path.join('uploads')
app.config ['CARPETA']=CARPETA

@app.route('/uploads/<nombreFoto>')
def uploads(nombreFoto):
   return send_from_directory(app.config ['CARPETA'],nombreFoto)

@app.route('/index_crud')
def index_crud():
    sql = "SELECT * FROM `alumnos`;"
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(sql)

    alumnos = cursor.fetchall()
    print(alumnos)

    conn.commit()

    return render_template('CRUD_Python/crud.html', alumnos=alumnos)

@app.route('/destroy/<int:id>')
def destroy(id):
    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("SELECT Foto FROM alumnos WHERE id=%s", id)
    fila = cursor.fetchall()
    os.remove(os.path.join(app.config['CARPETA'], fila[0][0]))

    cursor.execute("DELETE FROM alumnos WHERE id=%s", (id))
    conn.commit()
    return redirect('/index_crud')

@app.route('/edit/<int:id>')
def edit(id):
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM alumnos WHERE id=%s", (id))
    alumnos = cursor.fetchall()
    conn.commit()
    return render_template('CRUD_Python/edit.html', alumnos=alumnos)

@app.route('/update', methods=['POST'])
def update():
    _nombre = request.form['txtNombre']
    _apellido = request.form['txtApellido']
    _correo = request.form['txtCorreo']
    _foto = request.files['txtFoto']
    id = request.form['txtID']

    sql = "UPDATE alumnos SET Nombre=%s,Apellido=%s,Correo=%s WHERE id=%s ;"

    datos = (_nombre, _apellido, _correo, id)

    conn = mysql.connect()
    cursor = conn.cursor()

    now = datetime.now()
    tiempo = now.strftime("%Y%H%M%S")

    if _foto.filename != '':
        nuevoNombreFoto = tiempo + _foto.filename
        _foto.save("uploads/" + nuevoNombreFoto)

        cursor.execute("SELECT Foto FROM alumnos WHERE id=%s", id)
        fila = cursor.fetchall()

        os.remove(os.path.join(app.config['CARPETA'], fila[0][0]))
        cursor.execute("UPDATE alumnos SET foto=%s WHERE id=%s", (nuevoNombreFoto, id))
        conn.commit()

    cursor.execute(sql, datos)
    conn.commit()

    return redirect('/index_crud')

@app.route('/create')
def create():
    return render_template('CRUD_Python/create.html')

@app.route('/store_Bd', methods=['POST'])
def storage_Bd():
    _nombre=request.form['txtNombre']
    _apellido=request.form['txtApellido']
    _correo=request.form['txtCorreo']
    _foto=request.files['txtFoto']

    now=datetime.now()
    tiempo=now.strftime("%Y%H%M%S")

    if _foto.filename != '':
        nuevoNombreFoto = tiempo + _foto.filename
        _foto.save("uploads/" + nuevoNombreFoto)

    sql= "INSERT INTO `alumnos` (`Id`, `Nombre`, `Apellido`, `Correo`, `Foto`) VALUES (NULL,%s,%s,%s,%s);"

    datos=(_nombre,_apellido,_correo,nuevoNombreFoto)

    conn = mysql.connect()
    cursor=conn.cursor()
    cursor.execute(sql,datos)
    conn.commit()

    return redirect('/index_crud')


##Validacion de login

#Debugger
if __name__ == '__main__':
    app.run(debug=True)