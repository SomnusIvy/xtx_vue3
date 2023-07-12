<script setup>
  import { getDetail } from '@/apis/detail'
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import DetailHot from './components/DetailHot.vue'
  import XtxImageView from '@/components/ImageView/index.vue'
  import XtxSku from '@/components/XtxSku/index.vue'
  import { ElMessage } from 'element-plus'
  import { useCartStore } from '@/stores/cartStore'

  const goods = ref({})
  const route = useRoute()
  const getGoods = async () => {
    const res = await getDetail(route.params.id)
    goods.value = res.result
  }
  onMounted( () => getGoods() )

  let skuObj = {} 
  const skuChange = (sku) => {
    skuObj = sku
  }
  const cartStore = useCartStore()
  const count = ref(1)
  const addCart = () => {
    if ( skuObj.skuId ) {
      cartStore.addCart({
        id: goods.value.id,
        name: goods.value.name,
        picture: goods.value.mainPictures[0],
        price:  goods.value.price,
        count:  count.value,
        skuId: skuObj.skuId,
        attrsText: skuObj.specsText,
        selected: true
      })
    }else {
      ElMessage.warning('请选择规格')
    }
  }


</script>

<template>
  <div class="xtx-goods-page">
    <!-- 保证只有数据存在才渲染 -->
    <div class="container" v-if="goods.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories[1].id}` }">{{ goods.categories[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories[0].id}` }">{{ goods.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="info-container">
        <div class="goods-info">
          <div class="media" v-if="goods.mainPictures">
            <XtxImageView :image-list="goods.mainPictures"></XtxImageView>

            <ul class="goods-sales">
              <li>
                <p>销售人气</p>
                <p> {{ goods.salesCount }} </p>
                <p><i class="iconfont icon-task-filling"></i>销售人气</p>
              </li>
              <li>
                  <p>商品评价</p>
                  <p>{{ goods.commentCount }}</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goods.collectCount }}</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ goods.brand.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
            </ul>
          </div>

          <div class="spec">
            <p class="g-name">{{ goods.name }}</p>
            <p class="g-desc">{{ goods.desc }}</p>
            <p class="g-price">
              <span>{{ goods.price }}</span>
              <span>{{ goods.oldPrice }}</span>
            </p>
            <div class="g-service">
              <dl>
                <dt>促销</dt>
                <dd>12月好物放送，App领券购买直降120元</dd>
              </dl>
              <dl>
                <dt>服务</dt>
                <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
              </dl>
            </div>
            <XtxSku :goods="goods" @change="skuChange"></XtxSku>

            <div>
              <el-button size="large" class="btn" @click="addCart">
                  加入购物车
              </el-button>
            </div>
          </div>
        </div>

        <div class="goods-footer">
          <div class="goods-article">
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <img v-for="img in goods.details.pictures" v-img-lazy="img" :key="img">
                </div>
              </div>
            </div>

            <div class="goods-aside">
              <DetailHot :hot-type="1"></DetailHot>
              <DetailHot :hot-type="2"></DetailHot>
            </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .xtx-goods-page {
    .bread-container {
      padding: 25px 0;
    }

    .goods-info {
      display: flex;
      min-height: 600px;
      background: #fff;
      .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
        .goods-sales {
          display: flex;
          width: 400px;
          height: 140px;
          align-items: center;
          text-align: center;
          li {
            flex: 1;
            position: relative;
            // 伪元素
            ~li::after {
              content: "";
              position: absolute;
              top: 10px;
              left: 0;
              height: 60px;
              border-left: 1px solid #e4e4e4;
            }
            p {
              &:first-child {
                color: #999;
              }
              &:nth-child(2) {
                color: $priceColor;
                margin-top: 10px;
              }
              &:last-child {
                color: #666;
                margin-top: 10px;
                i {
                  color: $xtxColor;
                  font-size: 14px;
                  margin-right: 2px;
                }
                &:hover {
                  color: $xtxColor;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
        .g-name {
          font-size: 22px;
        }
        .g-desc {
          color: #999;
          margin-top: 10px;
        }
        .g-price {
          margin-top: 10px;
          span {
            &::before {
              content: "￥";
              font-size: 14px;
            }
            &:first-child {
              color: $priceColor;
              margin-right: 10px;
              font-size: 22px;
            }
            &:last-child {
              font-size: 16px;
              color: #999;
              text-decoration: line-through;
            }
          }
        }
        .g-service {
          margin-top: 10px;
          padding: 20px 10px 0 10px;
          width: 500px;
          background: #f5f5f5;
          dl {
            display: flex;
            padding-bottom: 20px;
            align-items: center;
            dt {
              width: 50px;
              color: #999;
            }
            dd {
               color: #666;
               &:last-child {
                span {
                  margin-right: 10px;
                  &::before {
                    content: "·";
                    color: $xtxColor;
                    margin-right: 2px;
                  }
                }
                a {
                  color: $xtxColor;
                }
               }
            }
          }
        }

        .btn {
          margin-top: 20px;
        }
      }
    }

    .goods-footer {
      display: flex;
      margin-top: 20px;
      .goods-article {
        margin-top: 20px;
        width: 940px;
        .goods-tabs {
          min-height: 600px;
          background: #fff;
          nav {
            display: flex;
            height: 70px;
            line-height: 70px;
            border-bottom: 1px solid #f5f5f5;
            a {
              position: relative;
              padding: 0 40px;
              font-size: 18px;
              // >span {
              //   color: $priceColor;
              // }
            }
          }
        }
      }

      .goods-aside {
        width: 280px;
        min-height: 1000px;
      }

      .goods-detail {
        padding: 40px;
        .attrs {
          display: flex;
          margin-top: 30px;
          flex-wrap: wrap;
          li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;
            .dt {
              width: 100px;
              color: #999;
            }
            .dd {
              flex: 1;
              color: #666;
            }
          }
        }
      }
    }
  }
</style>