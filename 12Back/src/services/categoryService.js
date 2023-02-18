import Category from "../db/models/categoryModel";


//카테고리 카테고리리스트 전체 보여주기 (포스트맨 작동함 )

export const showAllCategories = async (req, res, next) => {
  const searchAll = await Category.find({});
  res.json({ searchAll });
};

//카테고리  한개 조회(포스트맨 작동함)
export const findOneCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const searchOne = await Category.findOne({ categoryId });

  // if (req.query.edit) {
  //   res.send("req.query.edit");
  //   return;
  // }
  res.json({ searchOne });
};

//카테고리등록(포스트맨 작동함)
export const addCategory= async (req, res, next) => {
  const { name, description, imgUrl, } = req.body;

  try {
      if (!name) {
        throw new Error("필수항목을 입력해 주세요");
      }

    // db 카테고리데이터 생성
    await Category.create({
        name, description, imgUrl,
    });

    res.send("카테고리생성을 완료하였습니다.");
  } catch (err) {
    next(err);
  };

};

//카테고리수정 (포스트맨 작동함)
export const editCategory = async (req, res, next) => {
  const { name, description, imgUrl, } = req.body;
  const  { categoryId }  = req.params;
  
  try {
    let searchForEdit = await Category.findOne({ categoryId });
   
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!searchForEdit) {
      const err = "해당 카테고리가 없습니다. 정확한 카테고리명을 다시 한번 확인해 주세요.";
      return { err };
    }
    // if (!productName || !categoryId || !price)
    //   throw new Error('필수값은 반드시 입력해 주셔야 합니다.');
    await searchForEdit.updateOne({ name, description, imgUrl, });
    // const updated = Product.findOne({ id });
   
    return res.send('카테고리 수정을 완료하였습니다.')
    // res.write("<script>alert('카테고리 수정 완료')</script>");
  } catch (error) {
    return error;
  }
};




//id로 카테고리를 찾아서 삭제 (포스트맨 )

export const deleteCategory = async (req, res, next) => {

  try {
    const  {categoryId}  = req.params;
    const delOne = await Category.findOne({ categoryId });


    if (!delOne) throw new Error("카테고리가 존재하지 않습니다.");

    await Category.deleteOne({ categoryId });
    // alert("카테고리가 삭제되었습니다.")

    // 삭제후 다시 업데이트된 카테고리 리스트를 보내줌.
    // res.redirect("/Products")    
    res.send("삭제를 완료하였습니다.");
  } catch (err) {
    next(err);
  }
}