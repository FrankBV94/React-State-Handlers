# React State Managers
***
 Improve Python skills by learning how to code 20 beginner Python projects.
## Tabla of Contenidos
- [React State Managers](#react-state-managers)
  - [Tabla of Contenidos](#tabla-of-contenidos)
    - [Informacion General](#informacion-general)
      - [Observables](#observables)
      - [RxJS](#rxjs)
    - [Technologies](#technologies)
    - [Installation](#installation)
    - [Collaboration](#collaboration)
    - [FAQs](#faqs)


### Informacion General
#### Observables
Un Observable es una colección "lazy" de valores a la cual puedes "subscribirte" para así poder tener acceso a los valores. Un observable es un nuevo sistema "Push" para JavaScript; este produce múltiples valores "pusheando" a los Observer (consumidores). Un observable es como un Promise; con la diferencia que un Promise solo puede otorgar un solo valor, mientras que Observable puede otorgar múltiples valores.

**Anatomía de un Observable**

Los Observable son creados usando el constructor o el operador de creación; son subscritos a un Observer, se ejecuta para entregar next, error y complete notificaciones al Observer y su ejecución puede ser terminada.

Hay cuatro conceptos cuando tratamos con Observables:

* Creación de Observable
* Subscripción a Observable
* Ejecución del Observable
* Desechando el Observable

**Funcionamiento**

Primero, creamos un Observable por medio del mètodo *create*:

  ```javascript
  const observable = Observable.create((subscriber) => {

  })
  ```

  El parámetro que recibe el callback es una instancia de Subscriber, el cual implementa la interface Observer. Por medio de este Subscriber podemos almacenar valores en la cola y también decidir terminar el trabajo:

  ```javascript
  subscriber.next('Un dato')
  subscriber.next('Otro dato')
  subscriber.next('Último dato')
  subscriber.complete()
  subscriber.next('Me olvidé de este') // nunca se enviará
  ```

  Una vez que se hace llamado al método complete el subscriber no podrá emitir más datos. Bien, ahora tenemos una cola con mensajes, pero, ¿cómo accedemos a ellos? Aquí es donde entra Subscription.

  **Subscripciones**

  Para poder acceder a los datos que tiene un Observable, tenemos que subscribirnos a él mediante un Observer. Un Observer es simplemente una interface cuya definición indica que contiene tres métodos:

  * ***next***: este método acepta un argumento el cual es el dato enviado por el Observable.
  * ***error***: este método también un argumento el cual es un error. Puede ser una subclase de Error o cualquier otro tipo de dato.
  * ***complete***: este método es ejecutado cuando el Observable notifica que ya no hay más valores que enviar.

  Veamos al Observable en acción con un ejemplo:

  ```javascript
  const observer = {
  next: value => console.log('Valor recibido: ', value),
  error: err => console.error('Error encontrado: ', err),
  complete: _ => console.log('Ya no hay más valores por recibir')
  }
  observable.subscribe(observer)
  ```

  Si ejecutamos ese código obtendremos la siguiente salida:

  ```javascript
  // Valor recibido: 'Un dato'
  // Valor recibido: 'Otro dato'
  // Valor recibido: 'Último dato'
  // Ya no hay más valores por recibir
  ```
#### RxJS 
librería de Javascript, que te ayuda a gestionar secuencias de eventos.

### Technologies
***
A list of technologies used within the project:
* [Python](https://www.python.org/): Version 3.10.5
* [Visual Studio Code](https://code.visualstudio.com/): Version 1.69.2
### Installation
***
### Collaboration
***
### FAQs
***
