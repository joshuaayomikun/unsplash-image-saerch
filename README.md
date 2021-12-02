# React practical assignment

## Unsplash image search application

This is the ui implementation  of PAAS

The UI was implemented with [Next.js](https://nextjs.org/), the programming language used was TypeScript

## Setting up the project

After cloning from the [repo](https://github.com/joshuaayomikun/unsplash-image-saerch.git)
- you would see a `.env.local.sample` file, ensure to duuplicate the file and rename the duplicate to `.env.local` the project needs the file to set up the App.

- run  
    ```bash
    npm install
        # or
    yarn install
    ```
    to install its node_module packages.
## Running the code

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To build the application

To build the application for production, you can either build with only html export or build for server side rendering.

- to get the build for serverside rendering run 

    ```bash
    npm run build
    ```
    the build file can be located in `.next` folder of the root project.
    
    To start the procution app, run 

    ```bash
    npm run start
    ``` 
- to get the html build, you need to run

    ```bash
    next export
    ```

    run the above command after running the npm build. An out folder will be created which will contain the files need for html rendering. 
## Basic Packages used

I used:
- Material-ui for my design framework, you can read more about material [here](https://mui.com/) [https://mui.com/](https://mui.com/)
- Lodash for debounce, array iterations and manipulations, you can read more from [here](https://lodash.com/)
- SWR React Hooks for Data Fetching, you can read more [here](https://swr.vercel.app/) [https://swr.vercel.app/](https://swr.vercel.app/)

Refer to the `package.json` file to see the remainng packages

## Project file structures

The entire project is grouped into two

- The Pages folder

  The files in thr foler are served directly to the broswer, the file name is the route to be added to the base url of the APP. If the file is in a folder, you shoukd start with the folder name followed by the file name.

- The src folder

  This consists of other code files like
  
  - hooks 
    
    Custom hooks used the application are written here
  - components

    Components consisting in a page are stored in this folder, a page can have one or more components in it. 
  - constants

    constants used by the application are in this folder for example

    ```typescript
    export const apiUrls: Readonly<Record<string, string>> = {
        unsplashAuthorizeUrl: `${UNSPLASH_AUTHORIZE_URL}?client_id=${CLIENT_ID}&scope=public+read_user+write_likes&response_type=code&redirect_uri=`,
        unsplashTokenUrl: `${UNNSPLASH_TOKEN_URL}`,
        unsplashProfile: `${UNSPLASH_API_BASE_URL}/me`,
        unsplashLike: `${UNSPLASH_API_BASE_URL}/photos/`,
        unsplashSearchPhotos: `${UNSPLASH_API_BASE_URL}/search/photos`
    }
    ```

    the code snippet above is an app constants that has the urls of tht APIs to be consumed.
  - providers

    As an alternative to using redux for state management, I decided to use react context to manage my state and also share methods to change state across the application.
  - models

    I used models to map responses from the unsplash APIs 
  - layout

    currenty the only layout used for this project is the navbar
  - lib

    In here, I wrote a general function used across the application. For example, I have a typescript file called `functions.ts`, in here I have a function called 

    ```typescript 
    export async function fetchJson<T extends Record<keyof T, T[keyof T]>>(input: RequestInfo, init?: RequestInit): Promise<T> {
        try {
            // console.log({init});
            // debugger
            let token = typeof window !== "undefined" ? getCookie(cookieKeys.token) : ""
            const response = token !== "" ? await fetch(input, typeof init === "undefined" ? {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                    "Accept-Version": "v1"
                }
            } : init) : await fetch(input, init);
            const data = await response.json() as T
            // debugger
            if (response.ok) {
                    return data as T;
            }
            else {
                throw notificationMesage.AnErrorOccurred
            }

        } catch (error: any) {
            throw error
        }

    }
    ```