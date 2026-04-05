import ImageKit from '@imagekit/nodejs';


const imageKit= new ImageKit({
  privateKey:"private_4FYfk+VdYQ1+2n6BsyrWHxMMItE="
})


async function uploadFile(buffer){
  const result=await imageKit.files.upload({
    file:buffer.toString("base64"),
    fileName:"image.jpg"
  })
  return result
}

export default uploadFile