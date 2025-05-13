// ** Third Party Components
import { useForm } from 'react-hook-form'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Row, Col } from 'reactstrap'
import { useState, useEffect } from 'react'
import getNewsCategory from './getNewsCategory'
import {postAddNews} from './getNewsCategory'
import toast from 'react-hot-toast'


const BasicHookForm = () => {
  const [newsCategory, setNewsCategory] = useState([])
  const [addNews, setAddNews]= useState({Title:'', GoogleTitle:'',GoogleDescribe:'',MiniDescribe:'',Describe:'',Keyword:'',IsSlider:'',NewsCatregoryId:'',Image:''})


  const getCategories = async()=>{
    try {
    const result = await getNewsCategory()
    setNewsCategory(result)
    } catch (error) {
    
    }
}

useEffect(()=>{
  getCategories();
},[]);



  // ** Hooks
  const {
    reset,
    formState: { errors }
  } = useForm()

  const  handleForm = async ()=>{
    const formData = new FormData()
    formData.append('Title', addNews.Title)
    formData.append('GoogleTitle', addNews.GoogleTitle)
    formData.append('GoogleDescribe', addNews.GoogleDescribe)
    formData.append('MiniDescribe', addNews.MiniDescribe)
    formData.append('Describe', addNews.Describe)
    formData.append('Keyword', addNews.Keyword)
    formData.append('NewsCatregoryId', addNews.NewsCatregoryId)
    formData.append('Image', addNews.Image)
    const result = await postAddNews(formData)
    toast.success(result.message)
  }


  const handleReset = () => {
    reset({
      emailBasic: '',
      firstNameBasic: '',
      lastNameBasic: ''
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>اطلاعات را وارد نمائید</CardTitle>
      </CardHeader>
      <CardBody>
        <Form >
          <Row className='gy-1 pt-75'>
            <Col md={6} xs={12}>
                <Label className='form-label' for='subject'>
                  عنوان خبر
                </Label>
                <Input onChange={(e)=>setAddNews({...addNews,Title:e.target.value})} id='subject' placeholder='John' invalid={errors.subject && true} />
            </Col>
            <Col md={6} xs={12}>
                <Label className='form-label' for='googleTopic'>
                  عنوان گوگل
                </Label>
                <Input onChange={(e)=>setAddNews({...addNews,GoogleTitle:e.target.value})} id='googleTopic' placeholder='John' invalid={errors.subject && true} />
            </Col>
            <Col md={6} xs={12}>
                <Label className='form-label' for='googleDesc'>
                  توضیحات گوگل
                </Label>
                <Input onChange={(e)=>setAddNews({...addNews,GoogleDescribe:e.target.value})} id='googleDesc' placeholder='John' invalid={errors.subject && true} />
            </Col>
            <Col md={6} xs={12}>
                <Label className='form-label' for='shortDesc'>
                  توضیح کوتاه
                </Label>
                <Input onChange={(e)=>setAddNews({...addNews,MiniDescribe:e.target.value})} id='shortDesc' placeholder='John' invalid={errors.subject && true} />
            </Col>
            <Col md={4} xs={12}>
                <Label className='form-label' for='keyWord'>
                  کلمات کلیدی
                </Label>
                <Input onChange={(e)=>setAddNews({...addNews,Keyword:e.target.value})} id='keyWord' placeholder='John' invalid={errors.subject && true} />
            </Col>
            <Col md={4} xs={12}>
                <Label className='form-label' for='newsCategory'>
                  دسته بندی خبر
                </Label>
                <select class="form-select form-select-md" id='NewsCatregoryId'  >
                {newsCategory?.map((item, index)=>{
                  return(
                    <option onClick={(e)=>setAddNews({...addNews,NewsCatregoryId:item.id})} key={index}>{item.categoryName}</option>
                  )
                })}
                </select>
            </Col>
            <Col md={4} xs={12}>
                <Label className='form-label' for='Image'>
                  آپلود عکس 
                </Label>
                <Input onChange={(e)=>setAddNews({...addNews,Image:e.target.value})} type='file' id='Image' name='MultipleFiles' invalid={errors.number && true} multiple />
              </Col>
            <Col xs={12}>
                <Label className='form-label' for='desc'>
                  توضیحات دوره 
                </Label>
                <Input onChange={(e)=>setAddNews({...addNews,Describe:e.target.value})} type='textarea' name='desc' id='desc' rows='3' placeholder='Textarea' invalid={errors.desc && true}/>
            </Col>
            <Col xs={12} className='text-center mt-2 pt-50'>
                <Button onClick={handleForm} type='submit' className='me-1' color='primary' >
                  ثبت
                </Button>
                <Button outline color='secondary' type='reset' onClick={handleReset}>
                  انصراف
                </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default BasicHookForm
