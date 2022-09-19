# React State Managers

---

Improve Python skills by learning how to code 20 beginner Python projects.

## Tabla of Contenidos

- [React State Managers](#react-state-managers)
  - [Tabla of Contenidos](#tabla-of-contenidos)
    - [Informacion General](#informacion-general)
      - [Observables](#observables)
      - [RxJS](#rxjs)
      - [Context](#context)
      - [Redux](#redux)
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

- Creación de Observable
- Subscripción a Observable
- Ejecución del Observable
- Desechando el Observable

**Funcionamiento**

Primero, creamos un Observable por medio del mètodo _create_:

```javascript
const observable = Observable.create((subscriber) => {});
```

El parámetro que recibe el callback es una instancia de Subscriber, el cual implementa la interface Observer. Por medio de este Subscriber podemos almacenar valores en la cola y también decidir terminar el trabajo:

```javascript
subscriber.next("Un dato");
subscriber.next("Otro dato");
subscriber.next("Último dato");
subscriber.complete();
subscriber.next("Me olvidé de este"); // nunca se enviará
```

Una vez que se hace llamado al método complete el subscriber no podrá emitir más datos. Bien, ahora tenemos una cola con mensajes, pero, ¿cómo accedemos a ellos? Aquí es donde entra Subscription.

**Subscripciones**

Para poder acceder a los datos que tiene un Observable, tenemos que subscribirnos a él mediante un Observer. Un Observer es simplemente una interface cuya definición indica que contiene tres métodos:

- **_next_**: este método acepta un argumento el cual es el dato enviado por el Observable.
- **_error_**: este método también un argumento el cual es un error. Puede ser una subclase de Error o cualquier otro tipo de dato.
- **_complete_**: este método es ejecutado cuando el Observable notifica que ya no hay más valores que enviar.

Veamos al Observable en acción con un ejemplo:

```javascript
const observer = {
  next: (value) => console.log("Valor recibido: ", value),
  error: (err) => console.error("Error encontrado: ", err),
  complete: (_) => console.log("Ya no hay más valores por recibir"),
};
observable.subscribe(observer);
```

Si ejecutamos ese código obtendremos la siguiente salida:

```javascript
// Valor recibido: 'Un dato'
// Valor recibido: 'Otro dato'
// Valor recibido: 'Último dato'
// Ya no hay más valores por recibir
```

**Abortando subscripciones**

Las ejecuciones de un Observable pueden ser **infinitas**. Una práctica común que se desea para un Observer es abortar la ejecución cuando ya no necesitemos seguir observando valores. Para este propósito está la clase _Subscription_.

Cuando nos subscribimos a un observable, inmediatamente obtenemos una instancia de la clase _Subscription_, la cual, tiene entre su prototipo, al método _unsubscribe_. De esta manera, podemos detener la ejecución de un Observable.

```javascript
const subscription = observable.subscribe(observer);
// luego de un rato
subscription.unsubscribe();
```

Así ya no liberamos recursos usados por el Observable, optimizando nuestra aplicación 😉.

**Observables frios**

Los Observables "fríos" son aquellos que no emiten valores hasta que haya una suscripción activa, ya que la información es producida dentro del Observable y por tanto solo emiten valores en el momento en que se establece una nueva subscripción, por ejemplo math.random() que devuelve valores diferentes.

**Observables Calientes**

Por contra, los Observables "calientes" son aquellos que pueden emitir valores sin que haya ninguna subscripción activa, porque la información del stream se produce fuera del propio Observable. RxJs dispone de algunos Observables ¨calientes¨ y el mejor ejemplo de éstos, es fromEvent que nos permite establecer un Observable sobre cualquier tipo de evento como el click del ratón.

#### RxJS

Librería de Javascript, que te ayuda a gestionar secuencias de eventos.

**Subjects**

Los subjects de RxJs son un tipo de Observable especial que nos permiten realizar diversas tareas como el multicasting, es decir, compartir exactamente el mismo stream de datos con todas las subscripciones sin preocuparnos del tipo de Observable que estamos manejando.

Aparte, hay otra característica de los Subjects que les da una gran versatilidad y es que los Subjects de RxJs son Observables y Observers al mismo tiempo por lo que nos podemos subscribir a un Subject como a cualquier otro Observable, pero además disponen de los métodos _next()_, _error()_ y _complete()_ que tienen el Observer para emitir sus valores.

Vamos a volver a reproducir el primer ejemplo usando Subjects:

```javascript
const subject = new Rx.Subject(); // creamos nuestro subject

// Subscripción 1 al Subject que es un Observable
subject.subscribe((data) => {
  console.log(data); // 0.799234057357979
});

// Subscripción 2 al Subject que es un Observable
subject.subscribe((data) => {
  console.log(data); // 0.799234057357979
});

subject.next(Math.random()); // El subject usa el método next para emitir valores ya que también es un Observer.
```

Como vemos, ahora sí, gracias al multicasting que realizan los Subjects, tenemos la plena seguridad de que todas las subscripciones reciben exactamente el mismo valor sin importar si el Observable es frío o caliente.

RxJs dispone de diferentes tipos de Subjects que vienen a cubrir distintas necesidades como por ejemplo ¨recordar¨ el último valor emitido por el observable cuando se establece una nueva subscripción:

**Behaviour Subject**

Behaviour Subject nos permite utilizar una característica realmente útil y que es la de poder "recodar¨ el último valor emitido por el Observable a todas las nuevas subscripciones, al margen del momento temporal en que éstas se establezcan, actuando como un mencanismo de "sincronización" entre todas las subscripciones que resulta realmente últil:

```javascript
const subject = new Rx.BehaviorSubject(5); //Valor de iniciación

// Subscripción 1
subject.subscribe((data) => {
  console.log("Subscripción 1:", data);
});

subject.next(1);
subject.next(2);

// Subscripción 2
subject.subscribe((data) => {
  console.log("Subscripción 2:", data);
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
const subject = new Rx.BehaviorSubject("Hello"); // Hello es el valor por defecto del Observable

subject.subscribe((data) => {
  console.log(data); //Hello
});
```

**Replay Subject**

Replay Subject funciona de la misma forma que Behaviour Subject, pero así como Behaviour Subject solo tiene la habilidad de recordar el último valor emitido, con Replay Subject vamos a poder configurar el número de valores que queremos recordar a las nuevas subscripciones:

```javascript
const subject = new Rx.ReplaySubject(2); // Indicamos que queremos ¨recordar¨ los dos últimos valores

// Subscripción 1
subject.subscribe((data) => {
  console.log("Subscripción 1:", data);
});

subject.next(1);
subject.next(2);

// Subscripción 2
subject.subscribe((data) => {
  console.log("Subscripción 2:", data);
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

Async subject es el tercer tipo de Subjects de RxJs y tiene una particularidad bastante interesante pero que seguramente nos costará un poquito encontrar un uso para él, ya que Async Subject solo emitirá el último valor del Observable cuando éste haya finalizado, es decir, cuando se haya ejecutado el método _complete()_:

```javascript
const subject = new Rx.AsyncSubject();

// Subscripción 1
subject.subscribe((data) => {
  console.log("Subscripción 1:", data);
});

subject.next(1);
subject.next(2);

// Subscripción 2
subject.subscribe((data) => {
  console.log("Subscripción 2:", data);
});

subject.next(3);
subject.complete(); // Finalizamos el Observable
/*
Subscripción 1: 3
Subscripción 2: 3
*/
```

Los Subjects de RxJs son un mecanismo muy útil cuando queremos realizar multicasting y estar totalmente seguros que todas las subscripciones reciben exactamente los mismos valores, al margen del tipo de Observable que vayamos a utilizar. El empleo de subjects es fundamental cuando queremos afrontar escenarios de cierta complejidad, como por ejemplo, sistemas de store managment basados en RxJs.

#### Context

Context proporciona una forma de compartir valores como estos entre componentes sin tener que pasar explícitamente una _prop_ a través de cada nivel del árbol.

**Cuándo usar Context**

Context está diseñado para compartir datos que pueden considerarse “globales” para un árbol de componentes en React, como el usuario autenticado actual, el tema o el idioma preferido. Por ejemplo, en el código a continuación, pasamos manualmente una _prop_ de “tema” para darle estilo al componente Button:

```javascript
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // El componente Toolbar debe tener un prop adicional "theme"
  // y pasarlo a ThemedButton. Esto puede llegar a ser trabajoso
  // si cada botón en la aplicación necesita saber el tema,
  // porque tendría que pasar a través de todos los componentes.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

Usando Context podemos evitar pasar _props_ a través de elementos intermedios:

```javascript
// Context nos permite pasar un valor a lo profundo del árbol de componentes
// sin pasarlo explícitamente a través de cada componente.
// Crear un Context para el tema actual (con "light" como valor predeterminado).
const ThemeContext = React.createContext("light");

class App extends React.Component {
  render() {
    // Usa un Provider para pasar el tema actual al árbol de abajo.
    // Cualquier componente puede leerlo, sin importar qué tan profundo se encuentre.
    // En este ejemplo, estamos pasando "dark" como valor actual.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// Un componente en el medio no tiene que
// pasar el tema hacia abajo explícitamente.
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Asigna un contextType para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  // En este ejemplo, el tema actual es "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

**Antes de usar Context**

Context se usa principalmente cuando algunos datos tienen que ser accesibles por muchos componentes en diferentes niveles de anidamiento. Aplícalo con moderación porque hace que la reutilización de componentes sea más difícil.

Si solo deseas evitar pasar algunos props a través de muchos niveles, la composición de componentes suele ser una solución más simple que Context.

Por ejemplo, considera un componente _Page_ que pasa una prop _user_ y _avatarSize_ varios niveles hacia abajo para que los componentes anidados _Link_ y _Avatar_ puedan leerlo:

```javascript
  <Page user={user} avatarSize={avatarSize} />
  // ... que renderiza ...
  <PageLayout user={user} avatarSize={avatarSize} />
  // ... que renderiza ...
  <NavigationBar user={user} avatarSize={avatarSize} />
  // ... que renderiza ...
  <Link href={user.permalink}>
    <Avatar user={user} size={avatarSize} />
  </Link>
```

Puede parecer redundante pasar los props de _user_ y _avatarSize_ a través de muchos niveles si al final solo el componente _Avatar_ realmente lo necesita. También es molesto que cada vez que el componente _Avatar_ necesite más props, también hay que agregarlos en todos los niveles intermedios.

Una forma de resolver este problema sin usar Context es pasar el mismo componente Avatar para que los componentes intermedios no tengan que saber sobre los props _usuario_ o _avatarSize_:

```javascript
  function Page(props) {
    const user = props.user;
    const userLink = (
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    );
    return <PageLayout userLink={userLink} />;
  }

// Ahora tenemos:
<Page user={user} avatarSize={avatarSize} />
// ... que renderiza ...
<PageLayout userLink={...} />
// ... que renderiza ...
<NavigationBar userLink={...} />
// ... que renderiza ...
{props.userLink}
```

Con este cambio, solo el componente más importante Page necesita saber sobre el uso de _user_ y _avatarSize_ de los componentes _Link_ y _Avatar_.

Esta inversión de control puede hacer que tu código, en muchos casos, sea más limpio al reducir la cantidad de props que necesitas pasar a través de tu aplicación y dar más control a los componentes raíz. Sin embargo, esta inversión no es la opción correcta en todos los casos. Al mover más complejidad a niveles superiores del árbol, esos componentes en los niveles superiores resultan más complicados y obliga a los componentes en niveles inferiores a ser más flexibles de lo que podría ser deseable.

No estás limitado a un solo hijo por componente. Puede pasar varios hijos, o incluso tener varios “huecos” (slots) separados para los hijos, como se documenta aquí:

```javascript
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return <PageLayout topBar={topBar} content={content} />;
}
```

Este patrón es suficiente para muchos casos cuando necesitas separar a un componente hijo de sus componentes padres inmediatos. Puedes llevarlo aún más lejos con _render props_ si el hijo necesita comunicarse con el padre antes de renderizar.

Sin embargo, a veces, los mismos datos deben ser accesibles por muchos componentes en el árbol y a diferentes niveles de anidamiento. Context te permite “transmitir” dichos datos, y los cambios, a todos los componentes de abajo. Los ejemplos comunes en los que el uso de Context podría ser más simple que otras alternativas incluyen la administración de la configuración de localización, el tema o un caché de datos.

**API**

**React.createContext**

```javascript
const MyContext = React.createContext(defaultValue);
```

Crea un objeto Context. Cuando React renderiza un componente que se suscribe a este objeto Context, este leerá el valor de contexto actual del _Provider_ más cercano en el árbol.

El argumento _defaultValue_ es usado **únicamente** cuando un componente no tiene un _Provider_ superior a él en el árbol. Este valor por defecto puede ser útil para probar componentes de forma aislada sin contenerlos. Nota: pasar _undefined_ como valor al _Provider_ no hace que los componentes que lo consumen utilicen _defaultValue_.

**Context.Provider**

```javascript
<MyContext.Provider value={/* algún valor */}>
```

Cada objeto Context viene con un componente _Provider_ de React que permite que los componentes que lo consumen se suscriban a los cambios del contexto.

El componente _Provider_ acepta una prop _value_ que se pasará a los componentes consumidores que son descendientes de este _Provider_. Un _Provider_ puede estar conectado a muchos consumidores. Los _Providers_ pueden estar anidados para sobreescribir los valores más profundos dentro del árbol.

Todos los consumidores que son descendientes de un _Provider_ se vuelven a renderizar cada vez que cambia la prop _value_ del _Provider_. La propagación del _Provider_ a sus consumidores descendientes (incluyendo _.contextType_ y _useContext_) no está sujeta al método _shouldComponentUpdate_, por lo que el consumidor se actualiza incluso cuando un componente padre evita la actualización.

Los cambios se determinan comparando los valores nuevos y antiguos utilizando el mismo algoritmo que _Object.is_.

**Class.contextType**

```javascript
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* realiza un efecto secundario en el montaje utilizando el valor de MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* renderiza algo basado en el valor de MyContext */
  }
}
MyClass.contextType = MyContext;
```

A la propiedad _contextType_ en una clase se le puede asignar un objeto Context creado por _React.createContext()_. Al usar esta propiedad puedes consumir el valor actual más cercano de ese Context utilizando _this.context_. Puedes hacer referencia a ella en cualquiera de los métodos del ciclo de vida, incluida la función de renderizado.

Solo puedes suscribirte a un solo Context usando esta API. Si necesitas leer más de una, lee **Consumir múltiples Context**.

Si estás utilizando la sintaxis experimental de campos de clase pública, puedes usar un campo de clase **static** para inicializar tu **contextType**.

```javascript
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* renderiza algo basado en el valor */
  }
}
```

**Context.Consumer**

```javascript
<MyContext.Consumer>
  {value => /* renderiza algo basado en el valor de contexto */}
</MyContext.Consumer>
```

Un componente de React que se suscribe a cambios de contexto. Al usar este componente puedes suscribirte a un contexto dentro de un componente de función.

Requiere una función como hijo. La función recibe el valor de contexto actual y devuelve un nodo de React. El argumento _value_ pasado a la función será igual a la prop _value_ del _Provider_ más cercano para este contexto en el árbol. Si no hay un _Proveedor_ superior para este contexto, el argumento _value_ será igual al _defaultValue_ que se pasó a _createContext()_.

**Context.displayName**

El objeto Context acepta una propiedad de cadena de texto _displayName_. Las herramientas de desarrollo de React utilizan esta cadena de texto para determinar que mostrar para el Context.

Por ejemplo, el componente a continuación aparecerá como “NombreAMostrar” en las herramientas de desarrollo:

```javascript
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'NombreAMostrar';

<MyContext.Provider> // "NombreAMostrar.Provider" en las herramientas de desarrollo
<MyContext.Consumer> // "NombreAMostrar.Consumer" en las herramientas de desarrollo
```

**Ejemplos**

**Context dinámico**

Un ejemplo más complejo con valores dinámicos para el tema:

**theme-context.js**

```javascript
export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

export const ThemeContext = React.createContext(
  themes.dark // valor por defecto
);
```

**themed-button.js**

```javascript
import { ThemeContext } from "./theme-context";

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return <button {...props} style={{ backgroundColor: theme.background }} />;
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
```

**app.js**

```javascript
import { ThemeContext, themes } from "./theme-context";
import ThemedButton from "./themed-button";

// Un componente intermedio que utiliza ThemedButton.
function Toolbar(props) {
  return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };
  }

  render() {
    // El botón ThemedButton dentro de ThemeProvider
    // usa el tema del estado mientras que el exterior usa
    // el tema oscuro predeterminado
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

**Actualizando Context desde un componente anidado**

A menudo es necesario actualizar el contexto desde un componente que está anidado en algún lugar del árbol de componentes. En este caso, puedes pasar una función a través del contexto para permitir a los consumidores actualizar el contexto:

**theme-context.js**

```javascript
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
```

**theme-toggler-button.js**

```javascript
import { ThemeContext } from "./theme-context";

function ThemeTogglerButton() {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background }}
        >
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
```

**app.js**

```javascript
import { ThemeContext, themes } from "./theme-context";
import ThemeTogglerButton from "./theme-toggler-button";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // The entire state is passed to the provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

**Consumir múltiples Context**

Para mantener el renderizado de Context rápido, React necesita hacer que cada consumidor de contexto sea un nodo separado en el árbol.

```javascript
// Theme context, default to light theme
const ThemeContext = React.createContext("light");

// Contexto de usuario registrado
const UserContext = React.createContext({
  name: "Guest",
});

class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props;

    // Componente App que proporciona valores de contexto iniciales
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// Un componente puede consumir múltiples contextos.
function Content() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <UserContext.Consumer>
          {(user) => <ProfilePage user={user} theme={theme} />}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

Si dos o más valores de contexto se usan a menudo juntos, es posible que desees considerar la creación de tu propio componente de procesamiento que proporcione ambos.

**Advertencias**

Debido a que _Context_ usa la identidad por referencia para determinar cuándo se debe volver a renderizar, hay algunos errores que podrían provocar renderizados involuntarios en los consumidores cuando se vuelve a renderizar en el padre del proveedor. Por ejemplo, el código a continuación volverá a renderizar a todos los consumidores cada vez que el _Proveedor_ se vuelva a renderizar porque siempre se crea un nuevo objeto para _value_:

```javascript
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ something: "something" }}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

Para evitar esto, levanta el valor al estado del padre:

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { something: "something" },
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state.value}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

#### Redux

**Reducer**
El reducer es una función pura que toma el estado anterior y una acción, y devuelve en nuevo estado

### Technologies

---

A list of technologies used within the project:

- [Python](https://www.python.org/): Version 3.10.5
- [Visual Studio Code](https://code.visualstudio.com/): Version 1.69.2

### Installation

---

### Collaboration

---

### FAQs

---
