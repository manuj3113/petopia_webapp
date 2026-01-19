import { useEffect, useState } from 'react';
import { API_BASE_URL_DEMO, ADD_ACESS_EMPLOYEE, GET_ACCESS_EMPLOYEE_BY_ID } from '@/app/constants/config';
import { apiRequest } from '@/app/utils/apiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EmployeeAccessDataItem {
    id: number;
    employee_id: number;
    general: string[];
    module_permissions: string[];
    inventory: string[];
    reports: string[];
    invoices: string[];
    receipts: string[];
    clients_access: string[];
    pets_access: string[];
    createdAt: string;
    updatedAt: string;
  }
  

interface AddAccessEmployeeTabProps {
    employeeId: string | null;
    onSuccess: (id: string | number) => void
}

export default function AddAccessEmployeeTab({ employeeId, onSuccess}: AddAccessEmployeeTabProps) {
    const [employeeStateId, setEmployeeId] = useState<any | null>(employeeId);
    const [employeeAccessData, setEmployeeAccessData] = useState<EmployeeAccessDataItem | null>(null);
    const [generalPermissions, setGeneralPermissions] = useState<string[]>([]);
    const [modulePermissions, setModulePermissions] = useState<string[]>([]);
    const [inventoryPermissions, setInventoryPermissions] = useState<string[]>([]);
    const [reportPermissions, setReportPermissions] = useState<string[]>([]);
    const [invoicePermissions, setInvoicePermissions] = useState<string[]>([]);
    const [receiptPermissions, setReceiptPermissions] = useState<string[]>([]);
    const [clientPermissions, setClientPermissions] = useState<string[]>([]);
    const [petPermissions, setPetPermissions] = useState<string[]>([]);
    const urlParams = new URLSearchParams(window.location.search);
    const employeeSearchId = urlParams.get("id")?.trim() || localStorage.getItem('employee_add_id')?.trim() || "";
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        if (employeeSearchId) {
          setEmployeeId(employeeSearchId);
        }
      }, [employeeSearchId]);
    // const [employeeData, setEmployeeData] = useState<Partial<EmployeeDataAcessItem>>({});

    // Function to handle Select All and Deselect All
    const handleSelectAll = () => {
        setGeneralPermissions(["list_setup", "vendor_setup", "category_setup", "credit_card_info", "gift_cards"]);
        setModulePermissions(["boarding", "add", "modify", "delete", "adj_client_png_days", "adj_pet_pkg_days"]);
        setInventoryPermissions(["inventory", "add_inventory", "modify_inventory", "delete_inventory"]);
        setReportPermissions(["boarding", "general", "revenue", "lists"]);
        setInvoicePermissions(["add_invoices", "modify_invoices", "delete_invoices", "view_previous", "process_returns"]);
        setReceiptPermissions(["add_receipts", "view_previous", "modify_receipts", "delete_receipts", "cash_drawer", "issue_refunds", "closeout", "prepayments_deposits"]);
        setClientPermissions(["clients", "add", "modify", "delete"]);
        setPetPermissions(["pets", "add", "modify", "delete"]);
    };

    const handleDeselectAll = () => {
        setGeneralPermissions([]);
        setModulePermissions([]);
        setInventoryPermissions([]);
        setReportPermissions([]);
        setInvoicePermissions([]);
        setReceiptPermissions([]);
        setClientPermissions([]);
        setPetPermissions([]);
    };

    const handleSubmit = async (e: any) => {
        await e.preventDefault();

        try {
            const requestData = await {
                employee_id: parseInt(employeeStateId),
                general: generalPermissions,
                module_permissions: modulePermissions,
                inventory: inventoryPermissions,
                reports: reportPermissions,
                invoices: invoicePermissions,
                receipts: receiptPermissions,
                clients_access: clientPermissions,
                pets_access: petPermissions
            };

            const response = await apiRequest(`${API_BASE_URL_DEMO}${ADD_ACESS_EMPLOYEE}`, {
                method: "POST",
                body: JSON.stringify(requestData),
            });
            if(response)

            toast.success("General employee details added successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            onSuccess('');
        } catch (error) {
            toast.error("Error: General employee details not added!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const getEmployeeDataById = async (employeeId:any) => {
        setLoading(true)
        try {
            const response = await apiRequest(`${API_BASE_URL_DEMO}${GET_ACCESS_EMPLOYEE_BY_ID}`, {
                method: 'POST',
                body: JSON.stringify({ employee_id: parseInt(employeeId)})
            });
            setEmployeeAccessData(response);
            console.log("Response", response);
        } catch (error: any) {
            console.error("Error fetching data:", error);
    
        } finally {
          setLoading(false)
        }
    };
    
      useEffect(() => {
        if (employeeSearchId) {
          getEmployeeDataById(employeeSearchId);
        }
      }, [employeeSearchId]);

      useEffect(() => {
        if (employeeAccessData && Object.keys(employeeAccessData).length > 0) {
          // Set state with data from employeeAccessData
          setGeneralPermissions(employeeAccessData.general || []);
          setModulePermissions(employeeAccessData.module_permissions || []);
          setInventoryPermissions(employeeAccessData.inventory || []);
          setReportPermissions(employeeAccessData.reports || []);
          setInvoicePermissions(employeeAccessData.invoices || []);
          setReceiptPermissions(employeeAccessData.receipts || []);
          setClientPermissions(employeeAccessData.clients_access || []);
          setPetPermissions(employeeAccessData.pets_access || []);
        } else {
          // Reset all states to null or empty arrays if no data
          setGeneralPermissions([]);
          setModulePermissions([]);
          setInventoryPermissions([]);
          setReportPermissions([]);
          setInvoicePermissions([]);
          setReceiptPermissions([]);
          setClientPermissions([]);
          setPetPermissions([]);
        }
      }, [employeeAccessData]);
      

      

    return (
        <div className="permissions-section">
            {/* Select All / Deselect All buttons */}
            <div className="actions">
                <button type="button" onClick={handleSelectAll}>Select All</button>
                <button type="button" onClick={handleDeselectAll}>Deselect All</button>
            </div>

            {/* General Permissions */}
            <div className="permissions-group">
                <h2>General</h2>
                <div className="row">
                    <label><input className="form-check-input" type="checkbox" checked={generalPermissions.includes("list_setup")} onChange={() => setGeneralPermissions(generalPermissions.includes("list_setup") ? generalPermissions.filter(permission => permission !== "list_setup") : [...generalPermissions, "list_setup"])} /> List setup</label>
                    <label><input className="form-check-input" type="checkbox" checked={generalPermissions.includes("vendor_setup")} onChange={() => setGeneralPermissions(generalPermissions.includes("vendor_setup") ? generalPermissions.filter(permission => permission !== "vendor_setup") : [...generalPermissions, "vendor_setup"])} /> Vendor setup</label>
                    <label><input className="form-check-input" type="checkbox" checked={generalPermissions.includes("category_setup")} onChange={() => setGeneralPermissions(generalPermissions.includes("category_setup") ? generalPermissions.filter(permission => permission !== "category_setup") : [...generalPermissions, "category_setup"])} /> Category setup</label>
                    <label><input className="form-check-input" type="checkbox" checked={generalPermissions.includes("credit_card_info")} onChange={() => setGeneralPermissions(generalPermissions.includes("credit_card_info") ? generalPermissions.filter(permission => permission !== "credit_card_info") : [...generalPermissions, "credit_card_info"])} /> Credit card info</label>
                    <label><input className="form-check-input" type="checkbox" checked={generalPermissions.includes("gift_cards")} onChange={() => setGeneralPermissions(generalPermissions.includes("gift_cards") ? generalPermissions.filter(permission => permission !== "gift_cards") : [...generalPermissions, "gift_cards"])} /> Gift cards/certificates</label>
                </div>
            </div>

            {/* Module Permissions */}
            <div className="permissions-group">
                <h2>Module Permissions</h2>
                <div className="row">
                    <label><input className="form-check-input" type="checkbox" checked={modulePermissions.includes("boarding")} onChange={() => setModulePermissions(modulePermissions.includes("boarding") ? modulePermissions.filter(permission => permission !== "boarding") : [...modulePermissions, "boarding"])} /> Boarding</label>
                    <label><input className="form-check-input" type="checkbox" checked={modulePermissions.includes("add")} onChange={() => setModulePermissions(modulePermissions.includes("add") ? modulePermissions.filter(permission => permission !== "add") : [...modulePermissions, "add"])} /> Add</label>
                    <label><input className="form-check-input" type="checkbox" checked={modulePermissions.includes("modify")} onChange={() => setModulePermissions(modulePermissions.includes("modify") ? modulePermissions.filter(permission => permission !== "modify") : [...modulePermissions, "modify"])} /> Modify</label>
                    <label><input className="form-check-input" type="checkbox" checked={modulePermissions.includes("delete")} onChange={() => setModulePermissions(modulePermissions.includes("delete") ? modulePermissions.filter(permission => permission !== "delete") : [...modulePermissions, "delete"])} /> Delete</label>
                    <label><input className="form-check-input" type="checkbox" checked={modulePermissions.includes("adj_client_png_days")} onChange={() => setModulePermissions(modulePermissions.includes("adj_client_png_days") ? modulePermissions.filter(permission => permission !== "adj_client_png_days") : [...modulePermissions, "adj_client_png_days"])} /> Adj client png days</label>
                    <label><input className="form-check-input" type="checkbox" checked={modulePermissions.includes("adj_pet_pkg_days")} onChange={() => setModulePermissions(modulePermissions.includes("adj_pet_pkg_days") ? modulePermissions.filter(permission => permission !== "adj_pet_pkg_days") : [...modulePermissions, "adj_pet_pkg_days"])} /> Adj pet pkg days</label>
                </div>
            </div>

            {/* Inventory Permissions */}
            <div className="permissions-group">
                <h2>Inventory</h2>
                <div className="row">
                    <label><input className="form-check-input" type="checkbox" checked={inventoryPermissions.includes("inventory")} onChange={() => setInventoryPermissions(inventoryPermissions.includes("inventory") ? inventoryPermissions.filter(permission => permission !== "inventory") : [...inventoryPermissions, "inventory"])} /> Inventory</label>
                    <label><input className="form-check-input" type="checkbox" checked={inventoryPermissions.includes("add_inventory")} onChange={() => setInventoryPermissions(inventoryPermissions.includes("add_inventory") ? inventoryPermissions.filter(permission => permission !== "add_inventory") : [...inventoryPermissions, "add_inventory"])} /> Add inventory</label>
                    <label><input className="form-check-input" type="checkbox" checked={inventoryPermissions.includes("modify_inventory")} onChange={() => setInventoryPermissions(inventoryPermissions.includes("modify_inventory") ? inventoryPermissions.filter(permission => permission !== "modify_inventory") : [...inventoryPermissions, "modify_inventory"])} /> Modify inventory</label>
                    <label><input className="form-check-input" type="checkbox" checked={inventoryPermissions.includes("delete_inventory")} onChange={() => setInventoryPermissions(inventoryPermissions.includes("delete_inventory") ? inventoryPermissions.filter(permission => permission !== "delete_inventory") : [...inventoryPermissions, "delete_inventory"])} /> Delete inventory</label>
                </div>
            </div>

            {/* Reports Permissions */}
            <div className="permissions-group">
                <h2>Reports</h2>
                <div className="row">
                    <label><input className="form-check-input" type="checkbox" checked={reportPermissions.includes("boarding")} onChange={() => setReportPermissions(reportPermissions.includes("boarding") ? reportPermissions.filter(permission => permission !== "boarding") : [...reportPermissions, "boarding"])} /> Boarding</label>
                    <label><input className="form-check-input" type="checkbox" checked={reportPermissions.includes("general")} onChange={() => setReportPermissions(reportPermissions.includes("general") ? reportPermissions.filter(permission => permission !== "general") : [...reportPermissions, "general"])} /> General</label>
                    <label><input className="form-check-input" type="checkbox" checked={reportPermissions.includes("revenue")} onChange={() => setReportPermissions(reportPermissions.includes("revenue") ? reportPermissions.filter(permission => permission !== "revenue") : [...reportPermissions, "revenue"])} /> Revenue</label>
                    <label><input className="form-check-input" type="checkbox" checked={reportPermissions.includes("lists")} onChange={() => setReportPermissions(reportPermissions.includes("lists") ? reportPermissions.filter(permission => permission !== "lists") : [...reportPermissions, "lists"])} /> Lists</label>
                </div>
            </div>

            {/* Invoices Permissions */}
            <div className="permissions-group">
                <h2>Invoices</h2>
                <div className="row">
                    <label><input className="form-check-input" type="checkbox" checked={invoicePermissions.includes("add_invoices")} onChange={() => setInvoicePermissions(invoicePermissions.includes("add_invoices") ? invoicePermissions.filter(permission => permission !== "add_invoices") : [...invoicePermissions, "add_invoices"])} /> Add invoices</label>
                    <label><input className="form-check-input" type="checkbox" checked={invoicePermissions.includes("modify_invoices")} onChange={() => setInvoicePermissions(invoicePermissions.includes("modify_invoices") ? invoicePermissions.filter(permission => permission !== "modify_invoices") : [...invoicePermissions, "modify_invoices"])} /> Modify invoices</label>
                    <label><input className="form-check-input" type="checkbox" checked={invoicePermissions.includes("delete_invoices")} onChange={() => setInvoicePermissions(invoicePermissions.includes("delete_invoices") ? invoicePermissions.filter(permission => permission !== "delete_invoices") : [...invoicePermissions, "delete_invoices"])} /> Delete invoices</label>
                    <label><input className="form-check-input" type="checkbox" checked={invoicePermissions.includes("view_previous")} onChange={() => setInvoicePermissions(invoicePermissions.includes("view_previous") ? invoicePermissions.filter(permission => permission !== "view_previous") : [...invoicePermissions, "view_previous"])} /> View previous</label>
                    <label><input className="form-check-input" type="checkbox" checked={invoicePermissions.includes("process_returns")} onChange={() => setInvoicePermissions(invoicePermissions.includes("process_returns") ? invoicePermissions.filter(permission => permission !== "process_returns") : [...invoicePermissions, "process_returns"])} /> Process returns</label>
                </div>
            </div>

            {/* Receipts Permissions */}
            <div className="permissions-group">
                <h2>Receipts</h2>
                <div className="row">
                    <label><input className="form-check-input" type="checkbox" checked={receiptPermissions.includes("add_receipts")} onChange={() => setReceiptPermissions(receiptPermissions.includes("add_receipts") ? receiptPermissions.filter(permission => permission !== "add_receipts") : [...receiptPermissions, "add_receipts"])} /> Add receipts</label>
                    <label><input className="form-check-input" type="checkbox" checked={receiptPermissions.includes("view_previous")} onChange={() => setReceiptPermissions(receiptPermissions.includes("view_previous") ? receiptPermissions.filter(permission => permission !== "view_previous") : [...receiptPermissions, "view_previous"])} /> View previous</label>
                    <label><input className="form-check-input" type="checkbox" checked={receiptPermissions.includes("modify_receipts")} onChange={() => setReceiptPermissions(receiptPermissions.includes("modify_receipts") ? receiptPermissions.filter(permission => permission !== "modify_receipts") : [...receiptPermissions, "modify_receipts"])} /> Modify receipts</label>
                    <label><input className="form-check-input" type="checkbox" checked={receiptPermissions.includes("delete_receipts")} onChange={() => setReceiptPermissions(receiptPermissions.includes("delete_receipts") ? receiptPermissions.filter(permission => permission !== "delete_receipts") : [...receiptPermissions, "delete_receipts"])} /> Delete receipts</label>
                    <label><input className="form-check-input" type="checkbox" checked={receiptPermissions.includes("cash_drawer")} onChange={() => setReceiptPermissions(receiptPermissions.includes("cash_drawer") ? receiptPermissions.filter(permission => permission !== "cash_drawer") : [...receiptPermissions, "cash_drawer"])} /> Cash drawer</label>
                    <label><input className="form-check-input" type="checkbox" checked={receiptPermissions.includes("issue_refunds")} onChange={() => setReceiptPermissions(receiptPermissions.includes("issue_refunds") ? receiptPermissions.filter(permission => permission !== "issue_refunds") : [...receiptPermissions, "issue_refunds"])} /> Issue refunds</label>
                    <label><input className="form-check-input" type="checkbox" checked={receiptPermissions.includes("closeout")} onChange={() => setReceiptPermissions(receiptPermissions.includes("closeout") ? receiptPermissions.filter(permission => permission !== "closeout") : [...receiptPermissions, "closeout"])} /> Closeout</label>
                    <label><input className="form-check-input" type="checkbox" checked={receiptPermissions.includes("prepayments_deposits")} onChange={() => setReceiptPermissions(receiptPermissions.includes("prepayments_deposits") ? receiptPermissions.filter(permission => permission !== "prepayments_deposits") : [...receiptPermissions, "prepayments_deposits"])} /> Prepayments/Deposits</label>
                </div>
            </div>

            {/* Clients/Pets Permissions */}
            <div className="permissions-group">
                <h2>Clients/Pets</h2>
                <div className="row">
                    <label><input className="form-check-input" type="checkbox" checked={clientPermissions.includes("clients")} onChange={() => setClientPermissions(clientPermissions.includes("clients") ? clientPermissions.filter(permission => permission !== "clients") : [...clientPermissions, "clients"])} /> Clients</label>
                    <label><input className="form-check-input" type="checkbox" checked={clientPermissions.includes("add")} onChange={() => setClientPermissions(clientPermissions.includes("add") ? clientPermissions.filter(permission => permission !== "add") : [...clientPermissions, "add"])} /> Add</label>
                    <label><input className="form-check-input" type="checkbox" checked={clientPermissions.includes("modify")} onChange={() => setClientPermissions(clientPermissions.includes("modify") ? clientPermissions.filter(permission => permission !== "modify") : [...clientPermissions, "modify"])} /> Modify</label>
                    <label><input className="form-check-input" type="checkbox" checked={clientPermissions.includes("delete")} onChange={() => setClientPermissions(clientPermissions.includes("delete") ? clientPermissions.filter(permission => permission !== "delete") : [...clientPermissions, "delete"])} /> Delete</label>
                    </div>
                    <div className="row">
                    <label><input className="form-check-input" type="checkbox" checked={petPermissions.includes("pets")} onChange={() => setPetPermissions(petPermissions.includes("pets") ? petPermissions.filter(permission => permission !== "pets") : [...petPermissions, "pets"])} /> Pets</label>
                    <label><input className="form-check-input" type="checkbox" checked={petPermissions.includes("add")} onChange={() => setPetPermissions(petPermissions.includes("add") ? petPermissions.filter(permission => permission !== "add") : [...petPermissions, "add"])} /> Add</label>
                    <label><input className="form-check-input" type="checkbox" checked={petPermissions.includes("modify")} onChange={() => setPetPermissions(petPermissions.includes("modify") ? petPermissions.filter(permission => permission !== "modify") : [...petPermissions, "modify"])} /> Modify</label>
                    <label><input className="form-check-input" type="checkbox" checked={petPermissions.includes("delete")} onChange={() => setPetPermissions(petPermissions.includes("delete") ? petPermissions.filter(permission => permission !== "delete") : [...petPermissions, "delete"])} /> Delete</label>
                </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="actions">
            <button type="button" className="save" onClick={handleSubmit}>Save</button>
                <button type="button" className="cancel">Cancel</button>
            </div>
            <ToastContainer />
        </div>
    );
}
