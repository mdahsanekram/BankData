import React, { useEffect, useState, useMemo } from "react";
// import Header from "./Header";
import { TableHeader, Pagination, Search } from "./DataTable";
import useFullPageLoader from "./hooks/useFullPageLoader";
import Select from 'react-select';
// import ExternalInfo from "components/ExternalInfo";
// import AppConfig from "App.config";

const BankData = () => {
    const [comments, setComments] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    let [selectCity , setSelectCity] = useState(2);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 100;

    const headers = [
        { name: " BANK ID", field: "bank_id", sortable: false },
        { name: "IFSC", field: "ifsc", sortable: true },
        { name: "Branch", field: "branch", sortable: false },
        { name: "Bank Name", field: "bank_name", sortable: false },
        { name: "Address", field: "address", sortable: false }
    ];
    const options = [
        {
          label: "SELECT",
          value: "",
        },
        {
          label: "BANGALORE",
          value: "BANGALORE",
        },
        {
          label: "PUNJAB",
          value: "PUNJAB",
        },
        {
          label: "DELHI",
          value: "DELHI",
        },
        {
            label: "MUMBAI",
            value: "MUMBAI",
          },
      ];

      setSelectCity = (selectOptions)=>{

      let url = "https://vast-shore-74260.herokuapp.com/banks?city="+selectOptions.value;

      fetch(url)
      .then(response => response.json())
      .then(json => {
          hideLoader();
          setComments(json);
          console.log(json);
      });

      
      }


    useEffect(() => {
        const getData = () => {
            showLoader();

            fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
                .then(response => response.json())
                .then(json => {
                    hideLoader();
                    setComments(json);
                    console.log(json);
                });
        };

        getData();
    }, []);

    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.branch.toLowerCase().includes(search.toLowerCase()) ||
                    comment.bank_name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);

    return (
        <>
            {/* <Header title="Building a data table in react" /> */}

            {/* <ExternalInfo page="datatable" /> */}

            <div className="container">

            <h1>Bank Branches</h1>

            <div className=" row">
                <div className="col-md-12 text-left">
                    <div className="row">
                        <div className="col-md-3 flex-row-reverse">

                        <Select onChange={setSelectCity} options={options}/>


                      
                        </div>
                        <div className="col-md-6 flex-row-reverse"></div>
                        <div className="col-md-3 d-flex flex-row-reverse">
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {commentsData.map(comment => (
                                <tr>
                                    <th scope="row" key={comment.bank_id}>
                                        {comment.bank_id}
                                    </th>
                                    <td>{comment.ifsc}</td>
                                    <td>{comment.branch}</td>
                                    <td>{comment.bank_name}</td>
                                    <td>{comment.district}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                </div>
            </div>
            </div>
            {loader}
        </>
    );
};

export default BankData;
