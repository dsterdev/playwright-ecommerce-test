# Plan de pruebas: inicio de sesión

## Application Overview

Plan funcional y de experiencia para el acceso de usuarios en https://practicesoftwaretesting.com/. Incluye acceso a la pantalla, validaciones de email y contraseña, autenticación correcta e incorrecta, recuperación, registro, OAuth, acceso protegido y sesión. La interfaz observada muestra una pantalla Login en /auth/login, campos obligatorios Email address y Password, botón Login, control de visibilidad de contraseña, enlaces Register your account y Forgot your Password?, y autenticación correcta hacia /account con el encabezado My account. Asunción común: cada escenario comienza en un contexto de navegador limpio, sin sesión autenticada ni datos residuales. Los escenarios que requieran una cuenta válida deben obtener credenciales de una cuenta QA autorizada mediante variables de entorno o GitHub Secrets; no deben almacenar contraseñas en el repositorio ni en reportes. La app observada es una demo pública, por lo que validar disponibilidad del servicio antes de atribuir a la aplicación un fallo de red externo.

## Test Scenarios

### 1. Acceso y presentación del login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Abrir login desde la navegación principal

**File:** `tests/auth/login-entry.spec.ts`

**Steps:**
  1. En un contexto nuevo y sin autenticación, navegar a la página principal https://practicesoftwaretesting.com/.
    - expect: La página principal carga sin error y presenta el enlace Sign in en la navegación.
  2. Seleccionar el enlace Sign in.
    - expect: La URL cambia a https://practicesoftwaretesting.com/auth/login.
    - expect: El título de página indica Login - Practice Software Testing - Toolshop - v5.0.
    - expect: La página muestra el encabezado Login, los campos Email address * y Password *, el botón Login, el botón Sign in with Google y los enlaces Register your account y Forgot your Password?.

#### 1.2. Abrir directamente la ruta de login

**File:** `tests/auth/login-direct-route.spec.ts`

**Steps:**
  1. En un contexto nuevo sin sesión, navegar directamente a https://practicesoftwaretesting.com/auth/login.
    - expect: La pantalla de login aparece directamente, sin requerir visita previa a la página principal.
    - expect: Los campos de email y contraseña están vacíos y habilitados.

#### 1.3. Redirigir a login al abrir una ruta privada sin sesión

**File:** `tests/auth/unauthenticated-protected-route.spec.ts`

**Steps:**
  1. En un contexto nuevo sin autenticación, navegar directamente a https://practicesoftwaretesting.com/account.
    - expect: La aplicación redirige a /auth/login.
    - expect: No se muestra información privada de la cuenta.
    - expect: La pantalla de login queda lista para introducir credenciales.

#### 1.4. Alternar visibilidad de la contraseña

**File:** `tests/auth/password-visibility.spec.ts`

**Steps:**
  1. Abrir /auth/login e introducir una contraseña de prueba no sensible en el campo Password.
    - expect: El valor aparece inicialmente enmascarado y el campo conserva el valor introducido.
  2. Activar el botón/icono de visibilidad asociado al campo Password.
    - expect: El mismo valor se muestra sin cambiarlo.
    - expect: El control comunica correctamente su estado y puede activarse de nuevo.
  3. Volver a activar el control de visibilidad.
    - expect: La contraseña vuelve a quedar enmascarada y el valor no se pierde.

### 2. Validación de campos y errores de autenticación

**Seed:** `tests/seed.spec.ts`

#### 2.1. Rechazar el envío con ambos campos vacíos

**File:** `tests/auth/login-required-fields.spec.ts`

**Steps:**
  1. Abrir el login en un contexto limpio y pulsar Login sin completar campos.
    - expect: La navegación no cambia a /account.
    - expect: Email y Password se marcan como inválidos.
    - expect: Se muestran los mensajes Email is required y Password is required junto a sus campos.

#### 2.2. Validar email obligatorio cuando la contraseña está completa

**File:** `tests/auth/login-missing-email.spec.ts`

**Steps:**
  1. Abrir el login, dejar Email address vacío, completar Password con un valor de prueba y pulsar Login.
    - expect: La aplicación permanece en /auth/login.
    - expect: El email se marca como inválido y muestra Email is required.
    - expect: No se inicia una sesión ni se muestra información privada.

#### 2.3. Validar contraseña obligatoria cuando el email está completo

**File:** `tests/auth/login-missing-password.spec.ts`

**Steps:**
  1. Abrir el login, introducir un email con formato válido, dejar Password vacío y pulsar Login.
    - expect: La aplicación permanece en /auth/login.
    - expect: La contraseña se marca como inválida y muestra Password is required.
    - expect: No se inicia una sesión ni se muestra información privada.

#### 2.4. Rechazar formatos de email inválidos

**File:** `tests/auth/login-invalid-email-format.spec.ts`

**Steps:**
  1. Introducir un valor sin formato de email, por ejemplo not-an-email, completar Password y pulsar Login.
    - expect: El formulario permanece en /auth/login.
    - expect: El campo de email se marca como inválido y muestra Email format is invalid.
    - expect: No se envían credenciales ni se inicia sesión.

#### 2.5. Mostrar un error seguro ante credenciales incorrectas

**File:** `tests/auth/login-invalid-credentials.spec.ts`

**Steps:**
  1. Introducir una dirección de email válida de prueba y una contraseña incorrecta, luego pulsar Login.
    - expect: La aplicación permanece en /auth/login y no crea una sesión autenticada.
    - expect: Se muestra el mensaje Invalid email or password, sin revelar si el email existe.
    - expect: Los campos siguen disponibles para corregir las credenciales.

#### 2.6. Validar límites y normalización del email

**File:** `tests/auth/login-email-boundaries.spec.ts`

**Steps:**
  1. Probar valores de email con espacios iniciales/finales, longitud inusual y caracteres inválidos, siempre con una contraseña de prueba.
    - expect: Cada valor se valida de forma consistente según las reglas de email de la aplicación.
    - expect: Los valores mal formados muestran una validación clara y no causan navegación ni errores de interfaz.
    - expect: El comportamiento para espacios y límites de longitud queda documentado, sin aceptar silenciosamente una identidad distinta.

### 3. Autenticación, navegación y sesión

**Seed:** `tests/seed.spec.ts`

#### 3.1. Iniciar sesión con una cuenta QA válida

**File:** `tests/auth/login-success.spec.ts`

**Steps:**
  1. Abrir /auth/login en un contexto limpio e introducir las credenciales de una cuenta QA activa obtenidas de la configuración segura del entorno.
    - expect: La cuenta de prueba está autorizada y las credenciales no están escritas literalmente en el test ni expuestas en logs.
  2. Pulsar Login y esperar la navegación y respuesta de autenticación.
    - expect: La URL pasa a /account.
    - expect: Se muestra el encabezado My account y la navegación autenticada con el nombre del usuario o el menú de cuenta.
    - expect: No se muestra el error Invalid email or password.

#### 3.2. Enviar credenciales con el teclado

**File:** `tests/auth/login-submit-keyboard.spec.ts`

**Steps:**
  1. Abrir el login y completar email válido y contraseña QA válida.
    - expect: El foco está en un campo del formulario y los datos se introducen en los controles correspondientes.
  2. Enviar el formulario mediante Enter desde el campo de contraseña.
    - expect: El formulario se envía una sola vez.
    - expect: El resultado es el mismo que al activar Login: se navega a /account y se muestra My account.

#### 3.3. Mantener sesión al recargar la cuenta

**File:** `tests/auth/login-session-refresh.spec.ts`

**Steps:**
  1. Iniciar sesión correctamente con la cuenta QA válida.
    - expect: La página muestra My account en /account y el menú de usuario autenticado.
  2. Recargar la página de cuenta.
    - expect: La sesión sigue autenticada tras la recarga.
    - expect: La URL permanece en /account y la página muestra My account sin volver a pedir credenciales.

#### 3.4. Cerrar sesión e impedir acceso privado posterior

**File:** `tests/auth/logout.spec.ts`

**Steps:**
  1. Iniciar sesión con la cuenta QA y abrir el menú del usuario.
    - expect: El menú muestra la opción Sign out.
  2. Seleccionar Sign out.
    - expect: La aplicación navega a /auth/login.
    - expect: La navegación vuelve a mostrar Sign in y ya no muestra el menú del usuario autenticado.
  3. Navegar directamente a /account después de cerrar sesión.
    - expect: La aplicación redirige nuevamente a /auth/login y no presenta contenido privado.

#### 3.5. Completar login tras solicitar una ruta privada

**File:** `tests/auth/login-return-to-requested-route.spec.ts`

**Steps:**
  1. En un contexto sin sesión, abrir directamente /account.
    - expect: La aplicación redirige a /auth/login y conserva de forma segura la intención de navegación si ese es el comportamiento implementado.
  2. Iniciar sesión con credenciales QA válidas.
    - expect: El usuario llega a una pantalla privada autorizada; se documenta si vuelve a /account o a la ruta protegida originalmente solicitada.
    - expect: Nunca se entrega acceso a una ruta privada antes de confirmar la autenticación.

### 4. Enlaces y métodos de autenticación alternativos

**Seed:** `tests/seed.spec.ts`

#### 4.1. Abrir recuperación de contraseña desde login

**File:** `tests/auth/forgot-password-entry.spec.ts`

**Steps:**
  1. Desde /auth/login, seleccionar Forgot your Password?.
    - expect: La aplicación navega a /auth/forgot-password.
    - expect: Se muestra el encabezado Forgot Password, un campo obligatorio Email address y el botón Set New Password.
  2. Enviar el formulario de recuperación vacío.
    - expect: La aplicación marca el email como obligatorio y no confirma el envío de una solicitud vacía.

#### 4.2. Abrir registro desde login

**File:** `tests/auth/register-entry.spec.ts`

**Steps:**
  1. Desde /auth/login, seleccionar Register your account.
    - expect: La aplicación navega a /auth/register y muestra la pantalla de registro.
    - expect: La navegación de regreso permite volver al login sin crear una cuenta accidentalmente.

#### 4.3. Comprobar inicio de sesión alternativo con Google

**File:** `tests/auth/google-sign-in-entry.spec.ts`

**Steps:**
  1. Desde /auth/login, seleccionar Sign in with Google.
    - expect: Se inicia el flujo OAuth de Google o se presenta un mensaje informativo si el proveedor no está configurado.
    - expect: No se afirma autenticación exitosa sin completar un flujo autorizado.
    - expect: Si el proveedor externo está disponible, validar que el retorno a la aplicación deja sesión autenticada solo después de consentimiento y autorización válidos.

### 5. Usabilidad y accesibilidad del login

**Seed:** `tests/seed.spec.ts`

#### 5.1. Operar el formulario de login sin ratón

**File:** `tests/auth/login-keyboard-accessibility.spec.ts`

**Steps:**
  1. Abrir /auth/login y recorrer los controles usando Tab y Shift+Tab.
    - expect: El orden de foco es lógico: email, contraseña, control de visibilidad, Login y enlaces secundarios.
    - expect: El foco siempre es visible y los controles tienen nombres accesibles comprensibles.
  2. Activar Login mediante teclado con los campos vacíos.
    - expect: Se ejecuta la misma validación que con ratón y los errores quedan asociados o identificables junto a los campos correspondientes.

#### 5.2. Usar login en viewport móvil

**File:** `tests/auth/login-mobile-layout.spec.ts`

**Steps:**
  1. Abrir /auth/login en un viewport móvil representativo, por ejemplo 390 x 844, en un contexto limpio.
    - expect: El formulario se adapta al ancho móvil sin desbordamiento horizontal ni controles superpuestos.
    - expect: Email, Password, Login y los enlaces auxiliares son visibles o alcanzables mediante desplazamiento.
  2. Completar los campos y activar Login con el viewport móvil.
    - expect: Los controles aceptan entrada y el resultado del login conserva el comportamiento funcional esperado.
