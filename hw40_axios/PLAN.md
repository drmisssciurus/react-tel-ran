# Plan: User List App with API

Домашняя работа: список пользователей с API

Создать React + TypeScript + Vite приложение, которое загружает список пользователей с открытого API и отображает их карточками.

Нужно использовать:
-Axios для запросов;
-отдельный API-файл для работы с сервером;
-useEffect для загрузки данных;
-состояние запроса: loading, success, error;

минимум один HOC, например для добавления рамки, проверки условия или логирования props.

API:
https://jsonplaceholder.typicode.com/users

В приложении должна быть страница со списком пользователей. Для каждого пользователя показать имя, email, город и компанию.

Важно: компонент карточки пользователя не должен сам загружать данные. Он должен только получать пользователя через props и отображать его.

## What we need to build

Create a React + TypeScript + Vite app that fetches users from:

`https://jsonplaceholder.typicode.com/users`

and shows each user as a separate card.

Each card must show:

- name;
- email;
- city;
- company.

`UserCard` itself must never make the request. It only receives data through `props` and displays it.

---

## Step 1 — First, look at the shape of the API response

Before writing any types, open the API and see how one user actually looks.

It's important to notice that some data is nested:

```text
user
├── id
├── name
├── email
├── address
│   └── city
└── company
    └── name
```

So the city is not directly on `user.city` — it's inside `address`.

The company is also an object, not a plain string.

The goal of this step is to understand the real data shape before writing any TypeScript types.

---

## Step 2 — Describe the User type

Create a separate file:

```text
src/types/user.ts
```

Describe the user shape so it matches the real API response.

We need at least:

```text
User
├── id: number
├── name: string
├── email: string
├── address
│   └── city: string
└── company
    └── name: string
```

This step is also good practice for working with nested objects in TypeScript.

---

## Step 3 — Describe the request status

The assignment explicitly asks for three states:

```text
loading
success
error
```

So we make a separate type just for the request status.

Conceptually:

```text
RequestStatus =
  loading
  success
  error
```

When the app starts, the status is `loading`.

After a successful request:

```text
success
```

After a failed request:

```text
error
```

---

## Step 4 — Create a separate API file

Create:

```text
src/api/usersApi.ts
```

Its only job is talking to the API.

It should:

```text
call Axios
↓
send a GET request
↓
receive the users
↓
return User[]
```

This file must know nothing about:

```text
useEffect
React components
loading
cards
rendering
```

So we keep things separated:

```text
API logic → usersApi.ts

UI logic → React components
```

---

## Step 5 — Check the API file on its own

Before building the interface, make sure the API function really does return an array of users.

Logically it should look like:

```text
getUsers()
↓
Axios
↓
API
↓
User[]
```

This lets us test one small piece first, instead of debugging everything at once.

---

## Step 6 — Build UserCard

Create a component:

```text
UserCard.tsx
```

Its job is very simple:

```text
receive a user through props
↓
display the data
```

For example:

```text
Name
Email
City
Company
```

`UserCard` must not contain:

```text
axios
useEffect
fetch
API URL
```

It should not even know where the user came from. For this component, the user simply arrives through `props`.

---

## Step 7 — Build UsersPage

This is the component that controls the main page logic.

It will keep track of:

```text
users
status
```

Example of the app's state at different moments:

The page has just opened:

```text
users = []
status = loading
```

After a successful request:

```text
users = the received array
status = success
```

If something went wrong:

```text
status = error
```

---

## Step 8 — Load data with useEffect

`useEffect` is used inside `UsersPage`.

The flow:

```text
UsersPage appears
↓
useEffect runs
↓
getUsers()
↓
waiting for the answer
```

If the request succeeds:

```text
save users
↓
status = success
```

If the request fails:

```text
status = error
```

`useEffect` should trigger this request only once, right when the page appears.

---

## Step 9 — Render conditionally based on status

The page should show different content depending on the current request status.

The logic:

```text
if loading
→ show "Loading..."

if error
→ show an error message

if success
→ show the users
```

This way the UI always reflects the current request state directly.

---

## Step 10 — Render the users with map

When the status is `success`, go through the array:

```text
users
```

and create one for each user:

```text
UserCard
```

The data flow looks like this:

```text
UsersPage
│
├── user 1 → UserCard
├── user 2 → UserCard
├── user 3 → UserCard
└── ...
```

Passing the user through `props` is the important part here.

---

## Step 11 — Build the HOC

Instead of a HOC that just draws a border, it's better to use one that actually adds real behavior.

For example:

```text
withLogger
```

The idea behind the HOC:

```text
withLogger
   ↓
takes a Component
   ↓
creates a new Component
   ↓
logs the props
   ↓
renders the original Component
```

So:

```text
UserCard
↓
withLogger(UserCard)
↓
EnhancedUserCard
```

`UserCard` itself does not need to change at all.

This nicely demonstrates the main idea of a HOC:

> add extra behavior to a component without changing the component itself.

This is also a good place to practice generics in TypeScript, since the HOC needs to preserve the prop types of the wrapped component.

---

## Step 12 — Use the HOC version of the card

After building the HOC, use the wrapped component when rendering the list of users.

The architecture ends up looking like this:

```text
UsersPage
    ↓
EnhancedUserCard
    ↓
withLogger
    ↓
UserCard
```

Data still flows top-down through props, exactly as before.

---

## Step 13 — Connect UsersPage inside App

Keep `App.tsx` as simple as possible.

Its only job:

```text
App
 ↓
UsersPage
```

All the loading logic stays inside the page itself.

---

## Step 14 — Test all three states

First, a normal request:

```text
loading
↓
success
↓
cards appear
```

Then temporarily break the API URL.

For example, change it so the request fails on purpose.

Check that we see:

```text
loading
↓
error
↓
an error message appears
```

After testing, put the correct URL back.

---

## Step 15 — Light styling

Once the logic fully works, add some styling.

For example:

```text
the list
↓
grid / flex

a card
↓
padding
border
border-radius
spacing
```

It's best to leave styling for last, so it doesn't get in the way while working out the logic.

---

## Suggested project structure

```text
src/
│
├── api/
│   └── usersApi.ts
│
├── components/
│   └── UserCard/
│       ├── UserCard.tsx
│       └── UserCard.css
│
├── hoc/
│   └── withLogger.tsx
│
├── pages/
│   └── UsersPage.tsx
│
├── types/
│   └── user.ts
│
├── App.tsx
└── main.tsx
```

## Overall app flow

```text
App
 ↓
UsersPage
 ↓
useEffect
 ↓
getUsers()
 ↓
usersApi
 ↓
Axios
 ↓
API


API
 ↓
User[]
 ↓
UsersPage state
 ↓
map
 ↓
withLogger(UserCard)
 ↓
UserCard
```

## Recommended order of work

It's best not to start Axios, `useEffect`, the HOC, and the cards all at once. Instead:

1. Types → 2. API file → 3. Plain UserCard → 4. UsersPage → 5. Request states → 6. HOC

This way it's much easier to tell exactly where something broke if anything goes wrong.
