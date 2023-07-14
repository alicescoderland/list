import productsStyles from "../Products/Products.module.css";

function Products({ data }) {
  return (
    <section className={productsStyles.container}>
      <ul className={productsStyles.listItem}>
        {data?.map((dataItem) => {
          return (
            <li key={dataItem.id}>
              <div className={productsStyles.img}>
                <img src={dataItem.img} alt={dataItem.title} />
              </div>
              <div className={productsStyles.text}>
                <span>{dataItem.title}</span>
                <span>{dataItem.year} yr</span>
                <span>{dataItem.price} PLN</span>
              </div>
              <div className={productsStyles.description}>
                {dataItem.description}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Products;
