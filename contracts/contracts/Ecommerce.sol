//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./Products.sol";
import "./Sellers.sol";
import "./Buyers.sol";

contract Ecommerce is Products, Sellers, Buyers {
    function buyProduct(
        string[] memory _prodName,
        uint256[] memory _prodPrice,
        uint256[] memory _qnt,
        string[] memory _imgHash,
        uint256[] memory _prodIds,
        string memory _paymentId,
        string memory _orderStatus
    ) public payable onlyBuyer {
        uint256 totalAmt = 0;
        for (uint256 prod = 0; prod < _prodIds.length; prod++) {
            decreaseStock(_prodIds[prod], _qnt[prod]);
            uint256 amt = getPrice(_prodIds[prod]) * _qnt[prod];
            totalAmt += amt;
            address payable selleradd = getSellerAddress(_prodIds[prod]);
            addOrder(
                _prodIds[prod],
                _qnt[prod],
                amt,
                selleradd,
                _orderStatus,
                _paymentId
            );
        }
    }

    function addProduct(
        string memory _name,
        uint256 _price,
        uint256 _stock,
        string memory _desc,
        string memory _category,
        string memory _imgHash
    ) public onlySeller {
        require(_stock > 0, "invalid stock qnt");
        require(_price > 0, "invalid price amt");

        productCount++;
        products.push(
            Product(
                productCount,
                _name,
                _price,
                _stock,
                _imgHash,
                _desc,
                _category,
                payable(msg.sender)
            )
        );
        SellerProductCount[msg.sender]++;
        emit ProductAdded(
            productCount,
            _name,
            _price,
            _stock,
            _imgHash,
            _desc,
            _category,
            payable(msg.sender)
        );
    }

    function confirmation(uint256 _oId) public payable {
        confirmOrder(_oId);
        uint256 amt = getPendingOrderAmt(_oId);
        address payable sellerAddress = getOrderSellerAddress(_oId);
        sellerAddress.transfer(amt);
    }

    function updateOrderStatus(
        uint256 _ordId,
        address _buyerAddress,
        string memory _orderStatus
    ) public {
        for (uint256 i = 0; i < orderList[_buyerAddress].length; i++) {
            if (orderList[_buyerAddress][i].ordId == _ordId) {
                orderList[_buyerAddress][i].orderStatus = _orderStatus;
                return;
            }
        }
    }

    function getbBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function countSellerOrders() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < buyers.length; i++) {
            address buyer = buyers[i].buyerAddress;
            Order[] memory buyerOrderList = orderList[buyer];
            for (uint256 j = 0; j < buyerOrderList.length; j++) {
                if (buyerOrderList[j].sellerAddress == msg.sender) {
                    count++;
                }
            }
        }
        return count;
    }

    function getSellerOrders() public view returns (Order[] memory) {
        uint256 sellerOrdersCount = countSellerOrders();
        Order[] memory sellersOrders = new Order[](sellerOrdersCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < buyers.length; i++) {
            address buyer = buyers[i].buyerAddress;
            Order[] memory buyerOrderList = orderList[buyer];
            for (uint256 j = 0; j < buyerOrderList.length; j++) {
                if (buyerOrderList[j].sellerAddress == msg.sender) {
                    sellersOrders[counter] = buyerOrderList[j];
                    counter++;
                    if (counter == sellerOrdersCount) {
                        break;
                    }
                }
            }
        }
        return sellersOrders;
    }
}
