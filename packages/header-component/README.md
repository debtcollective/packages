![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Header

This is a Web component built using [Stencil](https://stenciljs.com/) to define the header for all debtcollective web apps.

# Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

Currently, due to an issue with lerna and the local dependencies, in order to run this component locally you will need to do the following:

```bash
yarn remove @debtcollective/dc-dropdown-component
yarn add @debtcollective/dc-dropdown-component
```

```bash
yarn install
yarn start
```

> In order to have a sense over the community session, you need to have the application running and make sure `community` prop variable match the application, like `http://lvh.me:3000`. Ultimately, you will need to allow CORS on the community app in that sense: Admin > Settings > CORS > add `http://lvh.me:3333` which suppose to be your `host` prop. Check example below.

To build the component for production, run:

```bash
yarn build
```

To run the unit tests for the components, run:

```bash
yarn test
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).

## Naming Components

When creating new component tags, we recommend _not_ using `stencil` in the component name (ex: `<stencil-datepicker>`). This is because the generated component has little to nothing to do with Stencil; it's just a web component!

Instead, use a prefix that fits your company or any name for a group of related components. For example, all of the Ionic generated web components use the prefix `ion`.

## Using this component

You can render the default styles with links you pass as props like:

```html
<dc-header host="http://lvh.me:3333" community="http://lvh.me:3000" links='[{"href":"http://debtcollective.org/","text":"About us"}, {"href":"https://community.debtcollective.org/","text":"Community"}, {"href":"https://teespring.com/stores/debt-collective","text":"Store"}]'></dc-header>
```

Alternatively, you can choose to inject your own structure by doing something like:

```html
<dc-header host="http://lvh.me:3333" community="http://lvh.me:3000">
  <div slot="header">
    <div class="nav-item d-md-flex">
      <a class="nav-link" href='http://debtcollective.org/'>
        About us
      </a>
    </div>
  </div>
  <div slot="menu">
    <div class="nav-item">
      <a class="nav-link" href='http://debtcollective.org/'>
        About us (Just menu)
      </a>
    </div>
  </div>
</dc-header>
```

> NOTE: be aware of not adding the latest "/" on the url props such as host and community

if you need to use router link within the donate button you should set `donateurl` to falsy value so the custom donate button will render alone

```jsx
<dc-header donateurl="">
  <div slot="donate">
    <Link class="btn-donate">Donate</Link>
  </div>
</dc-header>
```

### Script tag

- [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- Put a script tag similar to this `<script type="module" src="https://unpkg.com/@debtcollective/dc-header-component@latest/dist/header/header.esm.js"></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install dc-dropdown --save`
- Put a script tag similar to this `<script src='node_modules/dc-dropdown/dist/dropdown.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

- Run `npm install dc-dropdown --save`
- Add an import to the npm packages `import dc-dropdown;`
- Then you can use the element anywhere in your template, JSX, html etc
