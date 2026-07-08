import {
     Lock,
     Bell,
     Moon,
     Shield,
} from "lucide-react";

function SettingsCard({ role }) {
     const roleTitle = {
          student: "Student",
          teacher: "Teacher",
          admin: "Administrator",
     };

     const settings = [
          {
               icon: <Lock size={20} />,
               title: "Change Password",
               description: "Update your account password.",
          },
          {
               icon: <Bell size={20} />,
               title: "Notifications",
               description: "Manage notification preferences.",
          },
          {
               icon: <Moon size={20} />,
               title: "Appearance",
               description: "Light and dark mode support.",
          },
          {
               icon: <Shield size={20} />,
               title: "Privacy & Security",
               description: "Manage your account security settings.",
          },
     ];

     return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

               <div className="mb-6">
                    <h2 className="text-2xl font-bold">
                         {roleTitle[role]} Settings
                    </h2>

                    <p className="text-gray-500 mt-1">
                         Manage your account preferences.
                    </p>
               </div>

               <div className="divide-y">

                    {settings.map((setting) => (

                         <div
                              key={setting.title}
                              className="flex items-center justify-between py-5"
                         >

                              <div className="flex items-center gap-4">

                                   <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                        {setting.icon}
                                   </div>

                                   <div>

                                        <h3 className="font-semibold">
                                             {setting.title}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                             {setting.description}
                                        </p>

                                   </div>

                              </div>

                              <span className="text-sm text-gray-400 font-medium">
                                   Available Soon
                              </span>

                         </div>

                    ))}

               </div>

          </div>
     );
}

export default SettingsCard;