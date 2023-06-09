    import './portfolio.scss'
import PortfolioList from "../portfolioList/PortfolioList.tsx";
import {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {
    featuredPortfolio,
    webPortfolio,
    mobilePortfolio,
    designPortfolio,
    contentPortfolio, AddedMyWork
} from "../../data.ts";
import WorkForm from "../workform/WorkForm.tsx";
import useStore from "../../store/useStore.tsx";
    import {observer} from "mobx-react";

const Portfolio= observer(({portfolioOpen, setPortfolioOpen}) => {
    const [selected, setSelected] = useState("featured")
    const list = [
        {
            id: "featured",
            title: "Featured"
        },
        {
            id: "web",
            title: "Web App"
        },
        {
            id: "rest",
            title: "REST API"
        },
        {
            id: "design",
            title: "Design"
        },
        {
            id: "branding",
            title: "Branding"
        }
    ]
    const featureStore = useStore();
    useEffect(() => {
        if (featureStore.featuredPortfolio.length === 0) {
            featureStore.setItems()
        }
    },[featureStore])
    const [data, setData] = useState(featuredPortfolio)

    useEffect(() => {
        switch (selected) {
            case 'featured': {
                setData(featureStore.featuredPortfolio);
                break;
            }
            case 'web':
                setData(webPortfolio);
                break;
            case 'mobile':
                setData(mobilePortfolio);
                break;
            case 'design':
                setData(designPortfolio);
                break;
            case 'content':
                setData(contentPortfolio);
                break;
            default:
                setData(featureStore.featuredPortfolio);
                break;
        }

    }, [selected,featureStore]);
    const createNewItem = (item: AddedMyWork) => {
        featureStore.addItem(item);
    }
    const handleAddWorksClick = () => {
        setPortfolioOpen(!portfolioOpen);
    };


    return (
        <div className={"portfolio"} id={"portfolio"}>
            <h1>Portfolio</h1>
            <ul>
                {list.map((item) => (
                    <PortfolioList
                        title={item.title}
                        active={selected === item.id}
                        setSelected={setSelected}
                        id={item.id}
                    />
                ))}
            </ul>
            <div className="container">
                {data.map((d) => (
                    <a href={d.link} target={"_blank"}>
                        <div className="item">
                            <img src={d.img} alt={d.title}/>
                            <h3>{d.title}</h3>
                        </div>
                    </a>
                ))}
            </div>
            <div className={`feature-container ${portfolioOpen ? 'active' : ''}`}
                 onClick={handleAddWorksClick}>
                <div className={"add-feature"} onClick={(e) => e.stopPropagation()}>
                    <h1>Add work</h1>
                    <WorkForm portfolioOpen={portfolioOpen}
                              createWorkPlace={(item: AddedMyWork) => featureStore.createNewItem(item)}
                              handleAddWorksClick = {handleAddWorksClick}
                    />

                </div>
            </div>
            <div className={"add-works"} onClick={handleAddWorksClick}>
                <PlusOutlined
                    className={"plus"}
                />
            </div>
        </div>

    );
})
    export default Portfolio
