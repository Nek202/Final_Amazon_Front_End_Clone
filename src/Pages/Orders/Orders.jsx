// import React, { useContext, useEffect, useState } from "react";
// import classes from "./Order.module.css";
// import LayOut from "../../components/LayOut/LayOut";
// import { db } from "../../Utility/firebase";
// import { DataContext } from "../../components/DataProvider/DataProvider";

// function Orders() {
//   const { state, dispatch } = useContext(DataContext); // ✅ Fixed this line
//   const { user } = state; // ✅ Extract user from state
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (user) {
//       db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((onSnapshot) => {
//           console.log(onSnapshot);
//           setOrders(
//             onSnapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           );
//         });
//     }
//   }, [user]); // ✅ Added user to dependency array

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>
//           {orders?.length === 0 && <div>you don't have orders yet.</div>}
//           <div>
//             {orders?.map((eachOrder, i) => {
//               return (
//                 <div key={i}>
//                   <hr />
//                   <p>Order ID:{eachOrder?.id}</p>
//                   {eachOrder?.data?.basket?.map((orders) => {
//                     return (
//                       <ProductCard
//                         flex={true}
//                         product={orders}
//                         key={orders.id}
//                       />
//                     );
//                   })}
//                   {/* ✅ Fixed the missing return */}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Orders;

// import React, { useContext, useEffect, useState } from "react";
// import classes from "./Order.module.css";
// import LayOut from "../../components/LayOut/LayOut";
// import { DataContext } from "../../components/DataProvider/DataProvider";
// import ProductCard from "../../components/Product/ProductCard";

// // ✅ Import Firebase v9 functions
// import {
//   collection,
//   doc,
//   query,
//   orderBy,
//   onSnapshot,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "../../Utility/firebase";

// function Orders() {
//   const { state, dispatch } = useContext(DataContext);
//   const { user } = state;
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       // ✅ Use Firebase v9 syntax
//       const ordersRef = collection(db, "users", user.uid, "orders");
//       const q = query(ordersRef, orderBy("created", "desc"));

//       const unsubscribe = onSnapshot(
//         q,
//         (snapshot) => {
//           console.log("Orders snapshot:", snapshot.docs.length, "orders found");
//           const ordersData = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//           }));

//           console.log("Orders data:", ordersData);
//           setOrders(ordersData);
//           setLoading(false);
//         },
//         (error) => {
//           console.error("Error fetching orders:", error);
//           setLoading(false);
//         }
//       );

//       return () => unsubscribe();
//     } else {
//       setOrders([]);
//       setLoading(false);
//     }
//   }, [user]);

//   if (loading) {
//     return (
//       <LayOut>
//         <div>Loading orders...</div>
//       </LayOut>
//     );
//   }

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>

//           {/* Debug information */}
//           <div
//             style={{
//               marginBottom: "20px",
//               padding: "10px",
//               backgroundColor: "#f0f0f0",
//             }}
//           >
//             <p>User: {user ? user.email : "Not logged in"}</p>
//             <p>Orders found: {orders.length}</p>
//           </div>

//           <div>
//             {orders.length === 0 ? (
//               <div>
//                 <p>No orders found.</p>
//                 <p>Try making a purchase first!</p>
//               </div>
//             ) : (
//               orders.map((eachOrder, i) => (
//                 <div
//                   key={eachOrder.id || i}
//                   style={{
//                     marginBottom: "30px",
//                     border: "1px solid #ddd",
//                     padding: "15px",
//                   }}
//                 >
//                   <hr />
//                   <p>
//                     <strong>Order ID:</strong> {eachOrder?.id}
//                   </p>
//                   <p>
//                     <strong>Date:</strong>{" "}
//                     {eachOrder?.data?.created
//                       ?.toDate?.()
//                       ?.toLocaleDateString() || "Unknown"}
//                   </p>
//                   <p>
//                     <strong>Items:</strong>{" "}
//                     {eachOrder?.data?.basket?.length || 0}
//                   </p>

//                   <div style={{ marginTop: "15px" }}>
//                     {eachOrder?.data?.basket?.length > 0 ? (
//                       eachOrder.data.basket.map((product, index) => (
//                         <ProductCard
//                           flex={true}
//                           product={product}
//                           key={product.id || index}
//                         />
//                       ))
//                     ) : (
//                       <p>No products in this order</p>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Orders;
import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./Order.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Orders() {
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders"); // <-- FIXED HERE
      const q = query(ordersRef, orderBy("created", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <LayOut>
        <div>Loading orders...</div>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              You have no orders yet.
            </div>
          )}
          <div>
            {orders?.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.length > 0 ? (
                  eachOrder.data.basket.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))
                ) : (
                  <p>No products in this order</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
