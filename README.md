# Cloud_Computing

**Sirbu Andrei Mihai, G1119**

**Introducere**
Prezenta aplicatie este dezvoltata folosind un server Express si un client React, fiecare integrand API-uri oferite de platforma Google Cloud.
Server: https://fierce-thicket-19598.herokuapp.com/
Client: https://gentle-island-78459.herokuapp.com/

**Descriere problemă**
Scopul aplicatiei este acela de a procura informatii despre filme prin cautarea titlurilor acestora.

**Descriere API (0,25p)**
Pentru a putea accesa aplicatia, este nevoie de login prin Google OAuth2. Login-ul se poate face doar prin intermediul adreselor autorizate in Dashboard-ul Google Cloud Platform.
Odata logat, utilizatorul poate alege sa dea Log Out (implementat tot prin strategia OAuth2 de la Google) sau sa caute detalii despre un film folosind bara de cautare si apasand butonul 'Go!'.

**Flux de date (0,25p)**

Componenta de Login in client:
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            
            response: {"token_type":"Bearer","access_token":"ya29.a0ARrdaM8AIgkGTkXTPlCj2QdCEdbFPhd_iyE5TWpemx-h5FSMozpJ5YX2WDmooRQXA8YDuM5q57Fd-lER_K_SJEbi_P76oyNtMPNwLqzw2wpjh84Ho_6zJEfIlnkcnwPMxauorGSWnLI-UD73tctlVNM833c_hg","scope":"email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email","login_hint":"AJDLj6KVrUF648KizqiKX7C2XeRG155xkojvLDWILp6QOK5L1kD39Dj6Ak2FkA2lrLVfZB95kOzN-kV0Kyf3raF6rCrZ9AZa8gmNIGF6oxvE2Cg4AgxiGPE","expires_in":3599,"id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ4NmYxNjQ4MjAwNWEyY2RhZjI2ZDkyMTQwMThkMDI5Y2E0NmZiNTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTczODI3MTE4MTQzLWpoZWhrZDhkcDNzdWZsMGNtMHBhYWViYWoxdWl1NGs3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTczODI3MTE4MTQzLWpoZWhrZDhkcDNzdWZsMGNtMHBhYWViYWoxdWl1NGs3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1MTU1NzY1NTExNjYxNjE0NTY4IiwiaGQiOiJzdHVkLmFzZS5ybyIsImVtYWlsIjoic2lyYnVhbmRyZWkxOEBzdHVkLmFzZS5ybyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNHlwLVF2dFBzcDk4Ml9UOEVqYlF4QSIsIm5hbWUiOiJBbmRyZWkgTWloYWkgU2lyYnUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKd1Ftd3J2ZmxtLUtaNy16LV9LeE9mTnlONzVCM1NDOU9XNV9DdW49czk2LWMiLCJnaXZlbl9uYW1lIjoiQW5kcmVpIE1paGFpIiwiZmFtaWx5X25hbWUiOiJTaXJidSIsImxvY2FsZSI6InJvIiwiaWF0IjoxNjUyNjQ3MzAwLCJleHAiOjE2NTI2NTA5MDAsImp0aSI6IjI2ZGYyOWIwNjhhMTRlYzhhZDY3MTI3YWY1MzVhZWQwOTk5ZDRhZmQifQ.N03x9TGkeXoHvMlsebRljfYaxYVrZ3mwIi0eKQAS9MFVtkwoHS7MLtptEZ3U2QS0W46phyrU662VAQXhuN2vxwNOiAyWPZYLmIpFMP8vILR6X8EqIoc9ZEdmWm7nKex3DD0-d1djvBN7kYK-_x-ax-qEOh0SjtMYFMmVDMxji3nNMoycWw2_gvYKPf4DzNaxWeg7drlAbGDueh5XBGIpd6Xm5ZT2wKTC6AvcCflwgulMhwQSNQvJKuWjAdZrTsxmvWNsM-oJ9eXfZYmFG8fsVrqVVS8d--mjxu9lQIKzTJkmKx7vMr9gHJBjpJHE8cWrnAvY-5jCvH9nCfK7elFzqA","session_state":{"extraQueryParams":{"authuser":"3"}}}
            
Request cautare film catre backend: 
![image](https://user-images.githubusercontent.com/62596474/168493287-98cb6daf-a68b-4602-9d42-1ff330a93683.png)
req: POST: https://fierce-thicket-19598.herokuapp.com/search
res: {
    "@context": {
        "kg": "http://g.co/kg",
        "@vocab": "http://schema.org/",
        "goog": "http://schema.googleapis.com/",
        "detailedDescription": "goog:detailedDescription",
        "resultScore": "goog:resultScore",
        "EntitySearchResult": "goog:EntitySearchResult"
    },
    "@type": "ItemList",
    "itemListElement": [
        {
            "resultScore": 9723.1083984375,
            "result": {
                "name": "Die Hard",
                "@type": [
                    "Movie",
                    "CreativeWork",
                    "Thing"
                ],
                "@id": "kg:/m/0p3_y",
                "detailedDescription": {
                    "articleBody": "Die Hard is a 1988 American action film directed by John McTiernan, with a screenplay by Jeb Stuart and Steven E. de Souza. It is based on the 1979 novel Nothing Lasts Forever by Roderick Thorp, and it stars Bruce Willis, Alan Rickman, Alexander Godunov, and Bonnie Bedelia. ",
                    "license": "https://en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License",
                    "url": "https://en.wikipedia.org/wiki/Die_Hard"
                },
                "description": "1988 film"
            },
            "@type": "EntitySearchResult"
        }
    ]
}

**Capturi ecran aplicație (0,25p)**

Video Demo: https://youtu.be/MH9NnVnTn0M
![image](https://user-images.githubusercontent.com/62596474/168492732-cb23d293-103c-45b0-8112-4204820a0936.png)
![image](https://user-images.githubusercontent.com/62596474/168492756-8f139dee-1f61-4d54-a1ef-915bf4900916.png)
![image](https://user-images.githubusercontent.com/62596474/168492763-83d3aac1-5b27-4fe5-8799-0dce7e983399.png)
![image](https://user-images.githubusercontent.com/62596474/168492775-9b83e042-a841-4f76-9092-fdf859ab392f.png)

Aplicatie hostata in platforma Heroku:
![image](https://user-images.githubusercontent.com/62596474/168493388-bfd06f2e-166f-42c1-9de5-708c34727904.png)


**Referințe**
https://gurita-alexandru.gitbook.io/cloud-computing-2022-simpre/
https://developers.google.com/knowledge-graph
