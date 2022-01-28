# NPX Card
### Type `npx ragharwal` to connect with me directly via console or terminal

#### Steps to Create your Own NPX Card
### npm init
Start a new node project and name it whatever you want. You could choose to name it after the executable you want to expose. It's not necessary but conventions are nice, and it makes your binary more npx friendly.

```bash
mkdir ragharwal
cd ragharwal
npm init -y
```

At first, let's get the necessary CLI working.

```bash
echo >> index.js
```

Now open the new file in your favorite editor. I've have been using VS Code.

```javascript
console.log('Working')
```
Be creative and add logic to create your own index.js or you can simply copy my index.js file and necessary changes as required.

### Ship It
That's an entirely functional first release! You just need to modify your package.json to let npm know to link your executable and you are off.

```json
{
    // ...
    "bin": "./index.js",
    // ...
}
```

By defalut, `npm` will expose your binary using the same name as your package.

Share your new CLI with the World!

Now anyone can leverage your new CLI using `npx`, without needing to install it locally.

```bash
npx $YOUR_PACKAGE_NAME
```
