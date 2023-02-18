import User from "../db/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//회원가입
export const postJoin = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  //이메일 중복확인
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).send("이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.");
  }

  // 패스워드 해쉬화
  let saltRounds = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    return res.send("join");
  } catch (error) {
    res.status(400).send(error);
  }
};

//로그인
export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).send({ message: "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요." });
    }
    // //비밀번호 확인
    // //1번째는 프론트에서 가져온 비밀번호, 2번째는 db비밀번호
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(403).send({ message: "비밀번호가 일치하지 않습니다." });
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    // jwt 토큰에 유저 아이디 담기
    const token = jwt.sign({ userId: user.userId, role: user.role }, secretKey);
    const role = user.role;
    res.json({ token, role });
    return { token };
  } catch (error) {
    return res.status(400).send({ message: "로그인 실패" });
  }
};

//마이 페이지
export const seeMyPage = async (req, res) => {
  //토큰에 있는 id
  const id = req.currentUserId;

  const currentUser = await User.findOne({ userId: id });
  try {
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(400).send("실패");
  }
};

//회원 정보 수정
export const changeUser = async (req, res) => {
  const { email, phoneNumber, address } = req.body;
  const userId = req.currentUserId;
  let user = await User.findOne({ userId });

  try {
    // // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    const updatedUser = await user.updateOne({
      email,
      phoneNumber,
      address,
    });

    res.json(updatedUser);
    return updatedUser;
  } catch (error) {
    return error;
  }
};

//회원탈퇴
export const deleteUser = async (req, res) => {
  //토큰으로 유저 찾기
  const userId = req.currentUserId;
  const user = await User.findOne({ userId });

  const { password } = req.body;

  // //1번째는 프론트에서 가져온 비밀번호, 2번째는 db비밀번호
  const comparePassword = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    res.status(404).json({ message: "비밀번호가 일치하지 않습니다" });
    return;
  }

  try {
    //찾은 유저의 비밀번호를 삭제
    await user.deleteOne({ password: user.password });
    console.log("삭제완료");
    res.json({ message: "안전하게 삭제 완료했습니다." });
  } catch (error) {
    res.json({ message: "삭제에 실패했습니다.", error });
  }
};
