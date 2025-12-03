import AttendanceProvider from "./AttendanceContext";
import { AuthProvider } from "./AuthContext";
import { TaskProvider } from "./TaskContext";

export default function AppProviders({ children }) {
    return (

        <AuthProvider>
            <AttendanceProvider>
                <TaskProvider>
                    {children}
                </TaskProvider>
            </AttendanceProvider>
        </AuthProvider>
    )
}