"use client"

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AddPost = () => {
    const [deadline, setDeadline] = useState(new Date())
    const handleAddPost = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const data = {
            projectName: formData.get("projectName"),
            projectType: formData.get("projectType"),
            budget: formData.get("budget"),
            deadline,
        };

        console.log("Form submitted:", data);
    }


    return (
        <div>
            <div className='mb-10'>
                <form onSubmit={handleAddPost} className=' rounded-2xl px-32 py-16'>
                    <div className='grid grid-cols-2 gap-8'>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-lg text-primary">Project Name</legend>
                            <input type="text" name='projectName' required className="input w-full border-2 border-secondary" placeholder="Enter your project name" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-lg text-primary">Project Type</legend>
                            <input type="text" name='projectType' required className="input w-full border-2 border-secondary" placeholder="Photo URL" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-lg text-primary">Deadlines</legend>
                            <DatePicker
                                selected={deadline}
                                onChange={(date) => setDeadline(date)}
                                className="input w-full border-2 border-secondary"
                                dateFormat="dd/MM/yyyy" />
                        </fieldset>


                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-lg text-primary">Budget</legend>
                            <input type="text" name='instructions' required className="input w-full border-2 border-secondary" placeholder="Separate with periods" />
                        </fieldset>

                    </div>

                    <button className="btn btn-primary w-full text-lg my-4">Add Your Recipe</button>

                </form>
            </div>
        </div>
    );
};

export default AddPost;