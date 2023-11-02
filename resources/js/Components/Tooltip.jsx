import React from "react";

const Tooltip = ({ message, type }) => {
    return (
        <>
            {type == "error" && (
                <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                >
                    <h5>
                        <strong>{message}</strong>
                    </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            )}
            {type == "success" && (
                <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    <strong>{message}</strong>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            )}
        </>
    );
};

export default Tooltip;
