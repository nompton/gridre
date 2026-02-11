# GRID Real Estate (V1)

## Run locally

1) Install Node (LTS recommended)
2) In this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Add your photos

Put your images in:

`public/images/`

The site references these filenames by default:

- east-village.jpg
- chautauqua.jpg
- porch.jpg
- balcony.jpg

You can rename them, just update the paths in `app/page.tsx` and `app/manage/page.tsx`.

## Contact form

Set this in `.env.local`:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://YOUR-WORKER-URL/contact
```

Until you set it, the form will show an error on submit (by design).
