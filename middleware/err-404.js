export const error404 = (req, res) => {
  res.status(404);
  res.json({ errcode: 404, errmsg: "not found" });
}