import styled from 'styled-components';

export const UserInfoArea = styled.div`
    background-color: #DDD;
    border-bottom: 1px solid #CCC;
    padding: 20px 0;

    .userInfo {
        background-color: #FFF;
        border-radius: 3px;
        padding: 10px 20px;
        box-shadow: 0px 0px 3px #999;
        display: flex;
        flex-direction: column;

        .userInfoBox {
            display: flex;
            margin: 10px 0;
            align-items: center;

            .userInfoTitle {
                width: 200px;
                font-weight: bold;
                text-align: right;
                font-size: 14px;
            }

            .userInfoData {
                font-size: 14px;
                margin-left: 20px;
                padding: 5px;
                border-bottom: 1px solid #DDD;
                border-radius: 3px;

                .userInfoBtn {
                    background-color: #0089FF;
                    border: 0;
                    border-bottom: none;
                    outline: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                    color: #FFF;
                    font-size: 14px;
                    cursor: pointer;
                    width: 100px;
                    margin-top: 10px;

                    &:hover {
                        background-color: #006FCE;
                    }
                }
            }
            .userInfoData.btn {
                border: 0;
            }
        } 
    }

    @media (max-width: 600px) {

        .userInfo .userInfoBox {
            flex-direction: column;
        
            .userInfoTitle {
                width: 100%;
                text-align: center;
            }

            .userInfoData {
                width: fit-content;
                margin-left: 0;
                padding: 5px 0;

                .userInfoBtn {
                    width: 200px;
                }
            }
        }
    }
`;

export const UserAdsArea = styled.div`

    h2 {
        font-size: 20px;
    }
    
    .list {
        display: flex;
        flex-wrap: wrap;
    }

    .adBox {
        width: 25%;
    }

    .button {
        display: none;
        position: absolute;
        margin: 20px 10px 10px 20px ;
        width: 15.4%;
        background-color: #0089FF;
        border: 0;
        outline: 0;
        padding: 10px 10px;
        border-radius: 4px;
        color: #FFF;
        font-size: 14px;
        cursor: pointer;

        &:hover {
            background-color: #006FCE;
        }
    }

    .adBox:hover .button {
        display: inline-block;
    }   

    

    @media (max-width: 600px) {
        margin: 10px;

        .list .adBox {
            width: 50%;
        }

        .list .button {
            width: 30.8%;
        }
    }

    @media (max-width: 800px) {
        
        .list .button {
            display: inline-block;

            &:hover {
                background-color: #006FCE;
            }
        }
    }
`;
