import imageKit from '@imagekit/nodejs'

const imagekitClent= new imageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
  const result= await imagekitClent.files.upload({
    file,
    fileName:"music_"+ Date.now(),
    folder:"music"
  })
  return result
}

export default uploadFile
