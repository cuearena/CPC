import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";
import moniter from "../assets/svg/computer-svgrepo-com.svg";
import "../assets/css/datatabl.css"

const GupTable = ({ data, onPageChange }) => {
  const tableRef = useRef(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (tableRef.current) {
      const table = new DataTable(tableRef.current, {
        searchable: false,
        perPage: 5,
        perPageSelect: [5, 10, 15, 20],
        firstLast: true,
        nextPrev: true,
        layout: {
          top: "{select}{search}",
          bottom: "{page} {limit}",
        },
      });

      table.on("datatable.page", (page) => {
        onPageChange(page);
      });
    }
  }, [data, onPageChange]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="overflow-x-auto w-full">
      {/* Filter dropdown */}
      <div className="mb-4">
        <label htmlFor="filter" className="text-white mr-2">
          Filter by:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 bg-gray-800 text-white rounded"
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
        </select>
      </div>

      {/* Table */}
      <table
        ref={tableRef}
        className="min-w-full text-left bg-[#211F2A] text-white border border-gray-700 border-collapse"
      >
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 border-b border-gray-600">GPU</th>
            <th className="px-4 py-2 border-b border-gray-600">Location</th>
            <th className="px-4 py-2 border-b border-gray-600">Available</th>
            <th className="px-4 py-2 border-b border-gray-600">Rented</th>
            <th className="px-4 py-2 border-b border-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-[#211F2A] border-b border-gray-600">
              <td className="p-4 space-y-2">
                <div className="flex items-center">
                  <img
                    className="bg-purple-500 p-2 rounded text-white w-12 h-12"
                    src={moniter}
                    alt={item.name}
                  />
                  <div className="ml-4 text-left">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-400">{item.location}</p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-green-500">{item.location}</td>
              <td className="p-4 text-green-500">{item.available}</td>
              <td className="p-4 text-blue-500">{item.rented}</td>
              <td className="p-4">
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg">
                  Rent Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination will be rendered automatically by simple-datatables */}
    </div>
  );
};

export default GupTable;
