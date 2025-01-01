import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation,  } from '@/features/api/courseApi';
import axios from 'axios';
import { Loader2, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState('');
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const courseId = params.courseId;
  const lectureId = params.lectureId;

  const {data:lectureData} = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() =>{

    if(lecture){
      setLectureTitle(lecture.lectureTitle);
      setUploadVideoInfo(lecture.videoInfo);
      setIsFree(lecture.isPreviewFree);
    } 

  },[lecture])

  const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();

  const[ removeLecture ,{ data:removeLectureData,isLoading:removeLectureLoading, isSuccess:removeLectureSuccess}] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setMediaProgress(true);

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            const progress = Math.round((loaded * 100) / total);
            setUploadProgress(progress);
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error('Error uploading video');
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({ lectureTitle, videoInfo: uploadVideoInfo, isPreviewFree: isFree, courseId, lectureId });
  };

  const removeLectureHandler = async () =>{

    await removeLecture(lectureId);

  }

  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    if (error) toast.error(error.data?.message || "Something went wrong");
  }, [isSuccess, error]);

  useEffect(() =>{

    if(removeLectureSuccess){
      toast.success(removeLectureData.message);
    }



  }, [removeLectureSuccess]);





  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes to your lecture here</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" className="bg-red-600 hover:bg-red-400"

          disabled={removeLectureLoading}
          onClick={removeLectureHandler}
          
          >
           {
            removeLectureLoading ?
            <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            <span>Please wait...</span>
            </>:
            <span>Remove Lecture</span>
           }
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Eg. Introduction to React"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-600">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="airplane-mode"
            checked={isFree}
            onCheckedChange={(checked) => setIsFree(checked)}
          />
          <Label htmlFor="airplane-mode">Is this lecture free</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <p>{uploadProgress}% Uploaded</p>
            <Progress value={uploadProgress} />
          </div>
        )}
        <div className="mt-4">
          <Button
            className="bg-gray-800 hover:bg-gray-600"
            disabled={ isLoading}
            onClick={editLectureHandler}
          >
            {
              isLoading? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Lecture</span>
              )
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
