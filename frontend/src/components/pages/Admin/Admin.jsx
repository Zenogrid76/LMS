import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/students/studentlist/`)
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch students.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`${API_URL}/api/students/delete/${studentId}/`)
        .then(() => {
          setStudents(students.filter(student => student.studentid !== studentId));
        })
        .catch((err) => {
          setError("Failed to delete student. Please try again.");
        });
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#f9fbfa] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#101816] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Students
              </p>
              <button 
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#eaf1ef] text-[#101816] text-sm font-medium leading-normal hover:bg-[#adecda]"
                onClick={() => window.location.href = '/register'}
              >
                <span className="truncate">Add Student</span>
              </button>
            </div>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-[#d4e2df] bg-[#f9fbfa]">
                {loading ? (
                  <div className="w-full text-center py-10">Loading...</div>
                ) : error ? (
                  <div className="w-full text-center text-red-600 py-10">{error}</div>
                ) : (
                  <table className="flex-1 w-full">
                    <thead>
                      <tr className="bg-[#f9fbfa]">
                        <th className="px-4 py-3 text-left text-[#101816] w-[400px] text-sm font-medium leading-normal">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-[#101816] w-[400px] text-sm font-medium leading-normal">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-[#101816] w-[400px] text-sm font-medium leading-normal">
                          Institution
                        </th>
                        <th className="px-4 py-3 text-left text-[#5c8a7d] w-60 text-sm font-medium leading-normal">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.studentid} className="border-t border-t-[#d4e2df]">
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#101816] text-sm font-normal leading-normal">
                            {student.fullname}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#5c8a7d] text-sm font-normal leading-normal">
                            {student.email}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#5c8a7d] text-sm font-normal leading-normal">
                            {student.institution}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 text-[#5c8a7d] text-sm font-bold leading-normal tracking-[0.015em]">
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDelete(student.studentid)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
