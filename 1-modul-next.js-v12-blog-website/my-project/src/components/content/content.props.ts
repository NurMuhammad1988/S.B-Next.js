import { BlogsType } from "src/interface/blogs.interface";

export interface ContentProps{//bu ContentPropsda indexpageda content.tsga props bilan jo'natilgan blogsni type nima ekanligi yani hygraph serverdan keladigan datalarni typlari yozilgan BlogsType chaqirildi va content.tsga props bilan bu propsni typi aytib qo'yildi shunda hato chiqmaydi yani ts shu uchun  bu content.props.ts file conten papkani ichiga yozildi faillar structurasi bo'yicha bu to'gri endi bu file qaysi failga aloqador props type ekanligini aniqlash oson
    blogs: BlogsType[]
}   

// ended