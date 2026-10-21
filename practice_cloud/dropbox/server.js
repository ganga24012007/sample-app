const express = require("express");
const multer = require("multer");
const { Dropbox } = require("dropbox");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static("public"));

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const dbx = new Dropbox({
            accessToken: "sl.u.AG1Ijt9tsRl9lT7lJzEHFiGi8bGeGtX9BRMU2_SyfeQQF6WbRPGr5_ctVX4pjYjLEIRlf0gU3umORrC9vKvWCoZfZ_CsyJPPWXVCu36i-rm-qWYrU5uRhy4IksvAHY-M4SeY4-b75eoHIMhVUxRZDIhjvPBEHy8ZwAg0lHtqo7WzklB1zHv1FK3UTnZzWIOVRcSiUQw1yJFCbNxl3Qat9EUZ7dGWSYF495q9DZKi3lkVrPC0SLaKHjw_jMM0rOVnoa8P5lC9QIyqaboj2_iFdnjMO5NIIpIt0KgRvBBjGaRv5_TtkdrBaWRms4WHgYR4okOG9QXHjxXjKsR1rsbOALWifk1lZSqQYYGyd--m00edCSS0bUJ2f0lucBXEX7dRMmLQ2w7FAd_cllCinHr-nnvOoUbkHQmjS-IvaV4JR28keC8kZJi30AM6Pbyro6yhjcFQ8-LnRH3vYJHIIpdSY1ah4ax6-al3A3nU4ScW7-mE-l9T3m3Nd7bMq70BYFAyRVAVZBl2bKlOuFs7awE9OlKo9c1jHtqBL_00MhsUa-KTA6ttS8h0JQzy6ZwSFjP7MTtjNHkEXn8xE2s3GNtjfOh1_ySsNNUcfN7cZ2w-hN6_37G9P6K0TwIXwii2beCXw93_y12XCubhKvOxgJdM3VKydpn09-POOh4XW27X1wZCx1q123fWR4XT5VqHZxjbtqXqAf5kydlhqunRTfAQOYhAeECoE8ULwVWmVijzHSFBJGagkbcE3lGYCGKu9aHn7bQuk6JOfZLFUCNxLd83JPJWHkpAQAybmmgwLAaiYdhfvX0PcnAIw5jTWw1onVe1dRptisUCdBvT6rL1V-NlKyZfd7bDIoIrv0Ytvq02xaJH-FrCB9xbcZ18Lp5OTNoxo0yqbK73hmw0L3T6u23j5H8hanKKPgIEZgSSi_KxzcrFElVz4hYHU4qiaqv3EgGbw_izdHgHMegIN2HWzC04PMZiT5Gk47aguU652NI8c_0pQQksegPTjo2NfqEU7LWyHRE9Tbx-HlydMaWbB8Z58r9KTOGOk_s5anRHc4XwETOBK5uHkePDgwNZoK0K4CIbXY9ptTXipRlo32MprHTuDb_sfwUBKImSSo04RRGN4JUVLUgOMTgciKpymzUMREEbnm1t5V8-5MzORrmiA889GTRfOESIOp-NxPmPp3det-PabiIYS0QjVZr4--Ye1CvoJ9ZV7h5g3J3GNhI8s1IcehwhGmewNN2lJ7W0lVGqhr9LaFIZAZ6eac0k9pS7eAan-MhMk6UbcgFvHHi2mthe8lE6spoLYmEXkAWpcj3iTDkfhrdEiGm3iCNZSknHdibesDYLn-M7Zx-KvfajEXbBcf0ofroijY2d_ceSMyaxT2G_btHB7yz85zPQhq2Ew7qGn43gj0J5G67eBilapIqG_9iMk1HzKZWN1p7DFZNDMpfYDQ"
        });

        await dbx.filesUpload({
            path: "/" + req.file.originalname,
            contents: req.file.buffer
        });

        res.send(`
            <h2>File uploaded successfully!</h2>
            <a href="/">Upload another file</a>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send("Upload failed. Check your Dropbox token and permissions.");
    }
});

app.listen(3001, () => {
});