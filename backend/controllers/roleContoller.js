const roleModel = require("../models/Role")
//roleModel == roles
const getAllRoles = async (req, res) => {
  //await....
  //select * from roleModel

  const roles = await roleModel.find() //[{}]

  res.json({
    message: "role fetched successfully",
    data:roles
  });
};

const addRole = async (req,res)=>{
    //req.body,req.params,req.headers,req.query
  //console.log("request body....", req.body);
  //insert into roles () values()
  //database...
  const savedRole=await roleModel.create(req.body)

  res.json({
    message:"role created",
    data:savedRole
  })
  console.log(savedRole)
}
const deleteRole = async(req,res)=>{ const deletedRole = await roleModel.findByIdAndDelete(req.params.id)

  res.json({
    message:"role deleted successfully..",
    data:deletedRole
  })



}
const getRoleById = async (req,res)=>{

  //req.params.id

  const foundRole = await roleModel.findById(req.params.id)
  res.json({
    message:"role fatched..",
    data:foundRole
  })

}



module.exports = {
    getAllRoles,addRole,deleteRole,getRoleById
}