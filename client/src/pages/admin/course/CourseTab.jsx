import React, { useEffect, useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi';
import { toast } from 'sonner';

const CourseTab = () => {
    const [isPublished, setIsPublished] = useState(false);
    const [input, setInput] = useState({
        CourseTitle: '',
        SubTitle: '',
        Description: '',
        Category: '',
        courseLevel: '',
        coursePrice: '',
        courseThumbnail: '',
    });
    const params = useParams();
    const courseId = params.courseId;
    const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId, {
        refetchOnMountOrArgChange: true,
    });
    const [publishCourse, { data: publishCourseData, isLoading: publishCourseLoading }] = usePublishCourseMutation();

    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                CourseTitle: course.courseTitle,
                SubTitle: course.subTitle,
                Description: course.description,
                Category: course.category, // Ensure category is set here
                courseLevel: course.courseLevel, // Ensure courseLevel is set here
                coursePrice: course.coursePrice,
                courseThumbnail: '',
            });
            setIsPublished(course.isPublished);
        }
    }, [courseByIdData]);


    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const navigate = useNavigate();

    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();

    const ChangeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handlePublishToggle = async (action) => {
        // Optimistically update UI to reflect the change immediately
        setIsPublished((prevState) => !prevState);

        try {
            const response = await publishCourse({ courseId, query: action });
            if (response.data) {
                console.log('Publish response:', response.data);
                // Refetch course data after mutation to ensure it reflects the new published status
                await refetch();
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error('Publish error:', error);
            toast.error('Error publishing course. Please try again.');
        }
    };

    const selectCourseLevel = (value) => {
        setInput((prev) => ({ ...prev, courseLevel: value }));
    };

    const selectCategory = (value) => {
        setInput((prev) => ({ ...prev, Category: value }));
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput((prev) => ({ ...prev, courseThumbnail: file }));
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const updateCourseHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('courseTitle', input.CourseTitle);
            formData.append('subTitle', input.SubTitle);
            formData.append('description', input.Description);
            formData.append('category', input.Category);
            formData.append('courseLevel', input.courseLevel);
            formData.append('coursePrice', input.coursePrice);
            if (input.courseThumbnail) {
                formData.append('courseThumbnail', input.courseThumbnail);
            }

            await editCourse({ formData, courseId });
        } catch (err) {
            toast.error('An error occurred while updating the course.');
            console.error('Update course error:', err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Course successfully updated');
        }
        if (error) {
            toast.error(error?.data?.message || 'Something went wrong');
            console.error('API Error:', error);
        }
    }, [isSuccess, error, data]);

    if (courseByIdLoading) return <Loader2 className="w-5 h-5 animate-spin" />;

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>Make changes to your courses here. Click save when you're done.</CardDescription>
                </div>
                <div className="space-x-2">
                    <Button
                        disabled={courseByIdData?.course.lectures.length === 0}
                        variant="outline"
                        onClick={() => handlePublishToggle(courseByIdData?.course.isPublished ? 'false' : 'true')}>
                        {courseByIdData?.course.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="CourseTitle"
                            value={input.CourseTitle}
                            onChange={ChangeEventHandler}
                            placeholder="e.g. Complete React Developer in 2025"
                        />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input
                            type="text"
                            name="SubTitle"
                            value={input.SubTitle}
                            onChange={ChangeEventHandler}
                            placeholder="Become a FullStack developer from zero to hero!"
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>
                    <div className="flex flex-wrap items-center gap-5">
                        <div>
                            <Label>Category</Label>
                            <Select value={input.Category} onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px] transition-transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-500">
                                    <SelectValue placeholder="Select a Course" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {['Next JS', 'Data Science', 'Frontend Development', 'Fullstack Development', 'MERN Stack Development', 'Javascript', 'Python', 'Docker', 'MongoDB', 'HTML'].map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Course Level</Label>
                            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {['Beginner', 'Medium', 'Advanced'].map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>
                        <div>
                            <Label>Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={ChangeEventHandler}
                                placeholder="e.g. 2000"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input type="file" onChange={selectThumbnail} accept="image/*" className="w-fit" />
                        {previewThumbnail && <img src={previewThumbnail} alt="Course Thumbnail" className="w-64 my-2" />}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => navigate(-1)} variant="outline">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={updateCourseHandler}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseTab;
