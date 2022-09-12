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

  **Abortando subscripciones**

  Las ejecuciones de un Observable pueden ser **infinitas**. Una práctica común que se desea para un Observer es abortar la ejecución cuando ya no necesitemos seguir observando valores. Para este propósito está la clase *Subscription*.

  Cuando nos subscribimos a un observable, inmediatamente obtenemos una instancia de la clase *Subscription*, la cual, tiene entre su prototipo, al método *unsubscribe*. De esta manera, podemos detener la ejecución de un Observable.

  ```javascript
  const subscription = observable.subscribe(observer)
  // luego de un rato
  subscription.unsubscribe()
  ```

  Así ya no liberamos recursos usados por el Observable, optimizando nuestra aplicación 😉.

  **Observables frios**

  Los Observables "fríos" son aquellos que no emiten valores hasta que haya una suscripción activa, ya que la información es producida dentro del Observable y por tanto solo emiten valores en el momento en que se establece una nueva subscripción, por ejemplo math.random() que devuelve valores diferentes.

  **Observables Calientes**

  Por contra, los Observables "calientes" son aquellos que pueden emitir valores sin que haya ninguna subscripción activa, porque la información del stream se produce fuera del propio Observable. RxJs dispone de algunos Observables ¨calientes¨ y el mejor ejemplo de éstos, es fromEvent que nos permite establecer un Observable sobre cualquier tipo de evento como el click del ratón.
#### RxJS 
librería de Javascript, que te ayuda a gestionar secuencias de eventos.

**Subjects**

  Los subjects de RxJs son un tipo de Observable especial que nos permiten realizar diversas tareas como el multicasting, es decir, compartir exactamente el mismo stream de datos con todas las subscripciones sin preocuparnos del tipo de Observable que estamos manejando.

  Aparte, hay otra característica de los Subjects que les da una gran versatilidad y es que los Subjects de RxJs son Observables y Observers al mismo tiempo por lo que nos podemos subscribir a un Subject como a cualquier otro Observable, pero además disponen de los métodos *next()*, *error()* y *complete()* que tienen el Observer para emitir sus valores.

  Vamos a volver a reproducir el primer ejemplo usando Subjects:

  ```javascript
  const subject = new Rx.Subject();// creamos nuestro subject

  // Subscripción 1 al Subject que es un Observable
  subject.subscribe((data) => {
      console.log(data); // 0.799234057357979
  });

  // Subscripción 2 al Subject que es un Observable
  subject.subscribe((data) => {
      console.log(data); // 0.799234057357979
  });

  subject.next(Math.random());// El subject usa el método next para emitir valores ya que también es un Observer.
  ```

  Como vemos, ahora sí, gracias al multicasting que realizan los Subjects, tenemos la plena seguridad de que todas las subscripciones reciben exactamente el mismo valor sin importar si el Observable es frío o caliente.

  RxJs dispone de diferentes tipos de Subjects que vienen a cubrir distintas necesidades como por ejemplo ¨recordar¨ el último valor emitido por el observable cuando se establece una nueva subscripción:

  **Behaviour Subject**

  Behaviour Subject nos permite utilizar una característica realmente útil y que es la de poder "recodar¨ el último valor emitido por el Observable a todas las nuevas subscripciones, al margen del momento temporal en que éstas se establezcan, actuando como un mencanismo de "sincronización" entre todas las subscripciones que resulta realmente últil:

  ```javascript
  const subject = new Rx.BehaviorSubject(5); //Valor de iniciación

  // Subscripción 1
  subject.subscribe(data => {
      console.log('Subscripción 1:', data);
  });

  subject.next(1);
  subject.next(2);

  // Subscripción 2
  subject.subscribe(data => {
      console.log('Subscripción 2:', data);
  });

  subject.next(3);
  /*
  Subscripción 1: 5
  Subscripción 1: 1
  Subscripción 1: 2
  Subscripción 2: 2 La segunda subscripción recibe el último valor emitido
  Subscripción 1: 3
  Subscripción 2: 3
  */
  ```

  Como podemos ver en la salida, se estable una subscripción, se emite el valor inicial y los valores 1 y 2, y cuando la segunda subscripción se establece, ésta recibe el último valor emitido por el Observable, es decir el 2.

  Behaviour Subject es probablemente el Subject más usado, ya que es la base de la mayoría de implementaciones de Redux basadas en RxJs como @ngRxStore para Angular o una multiplataforma que escribí recientemente, llamada Rextore y que podéis encontrar en mi github. Behaviour Subject, además de recordar el último valor emitido a todas las subscripciones, nos permite definir un valor por defecto, que sería el equivalente al initial state de Redux:

  ```javascript
  const subject = new Rx.BehaviorSubject('Hello');// Hello es el valor por defecto del Observable

  subject.subscribe(data => {
      console.log(data); //Hello
  });
  ```

  **Replay Subject**

  Replay Subject funciona de la misma forma que Behaviour Subject, pero así como Behaviour Subject solo tiene la habilidad de recordar el último valor emitido, con Replay Subject vamos a poder configurar el número de valores que queremos recordar a las nuevas subscripciones:

  ```javascript
  const subject = new Rx.ReplaySubject(2); // Indicamos que queremos ¨recordar¨ los dos últimos valores

  // Subscripción 1
  subject.subscribe(data => {
      console.log('Subscripción 1:', data);
  });

  subject.next(1);
  subject.next(2);

  // Subscripción 2
  subject.subscribe(data => {
      console.log('Subscripción 2:', data);
  });

  subject.next(3);
  /*
  Subscripción 1: 1
  Subscripción 1: 2
  Subscripción 2: 1 La segunda subscripción recibe el penultimo valor emitido
  Subscripción 2: 2 La segunda subscripción recibe el último valor emitido
  Subscripción 1: 3
  Subscripción 2: 3
  */
```

**Async Subject**

  Async subject es el tercer tipo de Subjects de RxJs y tiene una particularidad bastante interesante pero que seguramente nos costará un poquito encontrar un uso para él, ya que Async Subject solo emitirá el último valor del Observable cuando éste haya finalizado, es decir, cuando se haya ejecutado el método *complete()*:

  ```javascript
  const subject = new Rx.AsyncSubject();

  // Subscripción 1
  subject.subscribe(data => {
      console.log('Subscripción 1:', data);
  });

  subject.next(1);
  subject.next(2);

  // Subscripción 2
  subject.subscribe(data => {
      console.log('Subscripción 2:', data);
  });

  subject.next(3);
  subject.complete(); // Finalizamos el Observable
  /*
  Subscripción 1: 3
  Subscripción 2: 3
  */
```

  los Subjects de RxJs son un mecanismo muy útil cuando queremos realizar multicasting y estar totalmente seguros que todas las subscripciones reciben exactamente los mismos valores, al margen del tipo de Observable que vayamos a utilizar. El empleo de subjects es fundamental cuando queremos afrontar escenarios de cierta complejidad, como por ejemplo, sistemas de store managment basados en RxJs.
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
