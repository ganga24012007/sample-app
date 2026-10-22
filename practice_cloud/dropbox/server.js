const express = require("express");
const multer = require("multer");
const { Dropbox } = require("dropbox");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static("public"));

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const dbx = new Dropbox({
            accessToken: "sl.u.AG3KKR1MRtA5h_0hgnSFKDZQ4bV5j_Fd6z8DQGI38CruGJIBw8RlAYNwzRnyVp71FRRQGmTaRvXWVr-ZlboxqlG-WUk53l-L9LY5eTRqpQW-KJSzuXUsqN7nDr7R2Nv4Rir37Y_CeBJ7nMLVNTS6ErNWsibL2uT5QDX1_33IGGuJxJFefg6bmyAA64l2wd9mFB_5W6e1krkheCSw8nRTEKGayDY8jMCI2sMI1q16STwbIP1wPbsIgcj4-tE22T_iC3uhlSoWgi-JnsgpSPZfQm302tLxlOgtVHDVRKLe4Yk_V5HrEP_sOnoaj8-4Lcykw0-p83Xv43UQb3lb-i0EwFhnQDlB5Onf-X2Hv08-DEmhXPMtlMGIUdo9lw-S8RvRmeBDtbq4t9lRxXwNsMqgIr_U82u5TqO9WKnvES-SveddKke1Jtq71CIp18MagE9Sh-X2pZKSxXLyh5p4LT3hrUayFQw5UUvhQwJbEKFumN8X3KFfUF7qjZn7ew22y69ABZrDBaa_i0kwBAaEQMl5uTd0-8PCK4lhx1ZUlF-jQgQxjroHorZGbE3TUqD86W_45mO3y7EMSTStlZyKeuzg22Xw__0qgeKTeN510q8yMZHlX8D0jB5hPTWpO0qGGIMZ9I-hBL49lvg7RoxN5zQvXg7E7bmNHjaAtJYz4z9vECc1meRuFhEGBZVTZgN4PS8ivhIYCFxpj58qBG1lYdz0KOb9N7e4lz-V2tiGV6-1WAhNSynKzuWk_lvaDekeDbB66yAyOtZc81Tsd4l1DSRo24kkJHWit9A0lDkugQ3v-_RC66MthrbEgapG-wbuvR7HfpQM5eKjTXj0EIKOQFvwrSqgQOZF7F6nB-HnaKymUGUoCfXBfnqIvBImEls1KE3gVR52D_vXY_tTlweSXFlc2a95VEAd5O7pop9gvb9ynRqNenE9SqEz6qV70yZNTGUJVEmr4662CZfW6gYjC23dvkFgNWOCsTDdvshZ2JlIn6hl6duA8EbdpZlIhnWjVukm1m-Qz5fut_MoNryHW6QIJrcRyI0YP0CfWN02gJe2L2q9AS4pRwycJwxRYRxXcQB_vtIaj8Fb1kGkUgwxiyWd0-RCuRF-lDdDmQujoOpb_T2SwkTGN2nGKHUshc3qajXG5e-KJyyf_ThTgxK_bhulHAHd1-Wpfsxg55jVIUx5hnMAig5ZmEENp_GiUvOxj5fsm9_vP-czT5WwPrpG5rcITtjMrpD48igoufOjcrY6eyFnPW2lMq1P4VW7q-L_vTatvk1UMq8bu86zG5E4EPUwW5P9V7ELrwZI0Iffgew3jBRWsFPUG907XgMmswZOeGt060HmCUgDm6kTycLUTtxtfgPHT8Lty_G3C-e-IjO5JBWrqwNtVPqrw23YKUjal_MhxwD_NfcGry8M5gEdsu5qiBaGhjULNr81NAXBNOmM45J5LA"
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
    console.log("Server is running on http://localhost:3001")});