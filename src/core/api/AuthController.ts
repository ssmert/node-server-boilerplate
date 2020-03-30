import { Request, Response, NextFunction } from "express";

async function login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    // const SQL = "SELECT * FROM user WHERE email = ?";
    // const SQL_VALUES = [req.body.email];
    // let userData;
    // try {
    //     userData = await mysql.connect((con: any) => con.query(SQL, [SQL_VALUES]))();
    // } catch (e) {
    //     next(e);
    // }
    // if (!(userData[0] && userData[0].length > 0)) return res.status(400).send("Please check Email or Password");

    // const pwd = userData[0][0].password;
    // const result = await new Promise(((resolve, reject) => {
    //     bcrypt.compare(req.body.password, pwd, (err, ret) => {
    //         if (err) reject(err);
    //         else resolve(ret);
    //     });
    // }));
    // if (!result) res.status(400).send("Please check Email or Password");

    // userData = userData[0][0];
    // const data = {
    //     seq: userData.seq,
    //     email: userData.email,
    //     nickname: userData.nickname,
    //     role: userData.role,
    //     u_created: userData.u_created,
    //     company: userData.company,
    // };

    // const token = await new Promise(((resolve, reject) => {
    //     jwt.sign(data, jwtConfig.secret, { expiresIn: "1h" }, (err, jwtToken) => {
    //         redis.client.set(data.email, jwtToken, "EX", 3600);
    //         resolve(jwtToken);
    //     });
    // }));

    // return res.status(200).send({
    //     data: {
    //         accessToken: token,
    //         userData: data,
    //     },
    // });

    return res.status(200).send({
        data: {
            accessToken: "",
            userData: "",
        },
    });
}

export { login };